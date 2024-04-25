// export default App;
import React, { useState } from "react"; 
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

//need to fix bug where image isn't saved when editing note
const App = () => { 
	
	// State variables 
	// Array to store notes 
	const [notes, setNotes] = useState([]); 

	// Selected note for editing 
	const [selectedNote, setSelectedNote] = useState(null); 

	// Note title 
	const [title, setTitle] = useState(""); 

	// Note content 
	const [content, setContent] = useState(""); 

	// Modal visibility state 
	const [modalVisible, setModalVisible] = useState(false); 

  //store the image uri
  const [imageUri, setImageUri] = useState(null);

  //function to open image picker
   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log('Image Picker Result:', result);  // Log the result from image picker

    if (!result.cancelled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        console.log('Image URI set:', result.assets[0].uri);  // Confirm image URI is set
    }
};

const handleSaveNote = () => {
    if (selectedNote) {
        // If a note is selected, update it
        const updatedNotes = notes.map((note) =>
            note.id === selectedNote.id
                ? { ...note, title, content, imageUri } // Include imageUri here to ensure it's updated
                : note
        );
        setNotes(updatedNotes);
        setSelectedNote(null);
    } else {
        // If no note is selected, add a new note
        const newNote = {
            id: Date.now(), // Ensuring each note has a unique ID
            title,
            content,
            imageUri  // Make sure to include imageUri when creating a new note
        };
        setNotes([...notes, newNote]);
    }
    setTitle(""); 
    setContent("");
    setImageUri(null);
    setModalVisible(false);
};


	// Function to handle editing a note 
	const handleEditNote = (note) => { 
		setSelectedNote(note); 
		setTitle(note.title); 
		setContent(note.content); 
		setModalVisible(true); 
    setImageUri(note.imageUri);
	}; 

	// Function to handle deleting a note 
	const handleDeleteNote = (note) => { 
		const updatedNotes = notes.filter( 
			(item) => item.id !== note.id 
		); 
		setNotes(updatedNotes); 
		setSelectedNote(null); 
		setModalVisible(false); 
	}; 

return (
    <View style={styles.container}>
        <Text style={styles.title}>My Notes</Text>
        <ScrollView style={styles.noteList}>
            {notes.map((note) => (
    <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        {note.imageUri && <Image source={{ uri: note.imageUri }} style={{ width: 100, height: 100 }} />}
    </TouchableOpacity>
        ))}
        </ScrollView>
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
                setTitle("");
                setContent("");
                setImageUri(null);
                setModalVisible(true);
            }}
        >
            <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter note title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.contentInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Enter note content"
                    value={content}
                    onChangeText={setContent}
                />
                {imageUri && (
                    <View>
                        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                        <Button title="Remove Image" onPress={() => setImageUri(null)} />
                    </View>
                )}
                <Button title="Pick Image" onPress={pickImage} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSaveNote}
                        color="#007BFF"
                    />
                    <Button
                        title="Cancel"
                        onPress={() => setModalVisible(false)}
                        color="#FF3B30"
                    />
                    {selectedNote && (
                        <Button
                            title="Delete"
                            onPress={() => handleDeleteNote(selectedNote)}
                            color="#FF9500"
                        />
                    )}
                </View>
            </View>
        </Modal>
    </View>)}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		backgroundColor: "#e6e6e6", 
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "#333", 
	}, 
	noteList: { 
		flex: 1, 
	}, 
	noteTitle: { 
		fontSize: 15, 
		marginBottom: 10, 
		fontWeight: "bold", 
		color: "black", 
		backgroundColor: "white", 
		height: 40, 
		width: "100%", 
		padding: 10, 
		borderRadius: 8, 
	}, 
	addButton: { 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#007BFF", 
		paddingVertical: 12, 
		borderRadius: 5, 
		marginTop: 10, 
	}, 
	addButtonText: { 
		color: "white", 
		fontSize: 16, 
		fontWeight: "bold", 
	}, 
	modalContainer: { 
		flex: 1, 
		padding: 50, 
		backgroundColor: "white", 
	}, 
	input: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 5, 
	}, 
	contentInput: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 20, 
		borderRadius: 5, 
		height: 150, 
		textAlignVertical: "top", 
	}, 
	buttonContainer: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
	}, 
}); 

export default App;
