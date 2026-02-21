from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import config
import generate
import train
import json
import numpy as np

app = FastAPI(title="AI Music Generation API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    length: int = 200
    model_type: str = "LSTM"

class StatusResponse(BaseModel):
    training: bool
    model_loaded: bool
    sequences_ready: bool

@app.post("/generate")
async def generate_endpoint(request: GenerateRequest):
    if not os.path.exists(config.MODEL_PATH) or not os.path.exists(config.MAPPING_PATH):
        raise HTTPException(status_code=400, detail="Model or mapping not found. Please train first.")
    
    try:
        # Load mapping to create a seed
        with open(config.MAPPING_PATH, "r") as fp:
            mapping = json.load(fp)
        
        seed = np.random.randint(0, len(mapping), config.SEQUENCE_LENGTH)
        notes = generate.generate_music(config.MODEL_PATH, config.MAPPING_PATH, seed, request.length)
        
        filename = f"generated_{os.urandom(4).hex()}.mid"
        midi_path = generate.save_to_midi(notes, filename)
        
        return {
            "file": filename,
            "url": f"/download/{filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/train")
async def train_endpoint(background_tasks: BackgroundTasks):
    if not os.path.exists(config.DATA_DIR) or not os.listdir(config.DATA_DIR):
        raise HTTPException(status_code=400, detail="No MIDI files found in data directory.")
    
    background_tasks.add_task(train.train)
    return {"message": "Training started in background."}

@app.get("/status", response_model=StatusResponse)
async def get_status():
    training_in_progress = False # This could be tracked via a global flag or file
    model_loaded = os.path.exists(config.MODEL_PATH)
    sequences_ready = os.path.exists(config.MAPPING_PATH)
    
    return {
        "training": training_in_progress,
        "model_loaded": model_loaded,
        "sequences_ready": sequences_ready
    }

@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(config.OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type='audio/midi', filename=filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
