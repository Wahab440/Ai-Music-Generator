import tensorflow as tf
from tensorflow.keras import layers, models, optimizers

def create_model(vocab_size, sequence_length, learning_rate=0.001):
    """Builds and compiles the LSTM model."""
    model = models.Sequential([
        layers.Input(shape=(sequence_length,), dtype='int32'),
        layers.Embedding(vocab_size, 256),
        layers.LSTM(512, return_sequences=True),
        layers.Dropout(0.3),
        layers.LSTM(512),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dense(vocab_size, activation='softmax')
    ])
    
    model.compile(
        optimizer=optimizers.Adam(learning_rate=learning_rate),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

if __name__ == "__main__":
    # Test model creation
    model = create_model(100, 100)
    model.summary()
