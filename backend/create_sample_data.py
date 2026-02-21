import music21 as m21
import os
import random

def create_sample_midi(filename, notes_count=300):
    stream = m21.stream.Stream()
    part = m21.stream.Part()
    part.insert(0, m21.instrument.Piano())
    
    # Random melodies
    pitches = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
    
    for i in range(notes_count):
        pitch = random.choice(pitches)
        n = m21.note.Note(pitch)
        n.quarterLength = 0.5
        part.append(n)
        
    stream.append(part)
    
    data_dir = "backend/data"
    os.makedirs(data_dir, exist_ok=True)
    
    filepath = os.path.join(data_dir, filename)
    stream.write('midi', fp=filepath)
    print(f"Created {filename} at {filepath}")

if __name__ == "__main__":
    for i in range(5):
        create_sample_midi(f"sample_{i}.mid")
