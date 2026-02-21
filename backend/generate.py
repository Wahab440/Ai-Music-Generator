import music21 as m21
import json
import numpy as np
import tensorflow as tf
import config
import os

def load_mapping(mapping_path):
    with open(mapping_path, "r") as fp:
        return json.load(fp)

def generate_music(model_path, mapping_path, seed_sequence, length=200):
    """Generates a new music sequence and saves it as a MIDI file."""
    mapping = load_mapping(mapping_path)
    inv_mapping = {v: k for k, v in mapping.items()}
    vocab_size = len(mapping)
    
    model = tf.keras.models.load_model(model_path)
    
    current_sequence = seed_sequence
    generated_notes = []
    
    print("Generating notes...")
    for _ in range(length):
        prediction_input = np.array([current_sequence[-config.SEQUENCE_LENGTH:]])
        probabilities = model.predict(prediction_input, verbose=0)[0]
        
        # Sample from the output to add variation
        predicted_idx = np.random.choice(range(vocab_size), p=probabilities)
        
        generated_notes.append(inv_mapping[predicted_idx])
        current_sequence = np.append(current_sequence, predicted_idx)
        
    return generated_notes

def save_to_midi(notes, filename):
    """Converts the note sequence to a MIDI file."""
    stream = m21.stream.Stream()
    
    for element in notes:
        # Pattern for chords: '1.3.5'
        if ('.' in element) or element.isdigit():
            notes_in_chord = element.split('.')
            chord_notes = []
            for current_note in notes_in_chord:
                new_note = m21.note.Note(int(current_note))
                new_note.storedInstrument = m21.instrument.Piano()
                chord_notes.append(new_note)
            new_chord = m21.chord.Chord(chord_notes)
            stream.append(new_chord)
        else:
            new_note = m21.note.Note(element)
            new_note.storedInstrument = m21.instrument.Piano()
            stream.append(new_note)
            
    midi_path = os.path.join(config.OUTPUT_DIR, filename)
    stream.write('midi', fp=midi_path)
    return midi_path

if __name__ == "__main__":
    # Example usage (requires trained model and mapping)
    if os.path.exists(config.MODEL_PATH) and os.path.exists(config.MAPPING_PATH):
        mapping = load_mapping(config.MAPPING_PATH)
        seed = np.random.randint(0, len(mapping), config.SEQUENCE_LENGTH)
        notes = generate_music(config.MODEL_PATH, config.MAPPING_PATH, seed)
        save_to_midi(notes, "generated_test.mid")
