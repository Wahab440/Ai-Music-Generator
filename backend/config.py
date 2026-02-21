import os

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
MODELS_DIR = os.path.join(BASE_DIR, "model")

# MIDI Preprocessing
SEQUENCE_LENGTH = 32
MAPPING_PATH = os.path.join(MODELS_DIR, "mapping.json")

# Training
BATCH_SIZE = 64
EPOCHS = 100
LEARNING_RATE = 0.001
VALIDATION_SPLIT = 0.2

# Model
MODEL_PATH = os.path.join(MODELS_DIR, "music_model.h5")
LOSS_PLOT_PATH = os.path.join(OUTPUT_DIR, "loss_plot.png")

# Generation
GEN_LENGTH = 200

# Ensure directories exist
for d in [DATA_DIR, OUTPUT_DIR, MODELS_DIR]:
    if not os.path.exists(d):
        os.makedirs(d)
