// export default App;
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [tags, setTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [videoUri, setVideoUri] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('Image Picker Result:', result);

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
            console.log('Image URI set:', result.assets[0].uri);
        }
    };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('Video Picker Result:', result);

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setVideoUri(result.assets[0].uri);
            console.log('Video URI set:', result.assets[0].uri);
        }
    };

    const handleSaveNote = () => {
        if (selectedNote) {
            const updatedNotes = notes.map((note) =>
                note.id === selectedNote.id
                    ? { ...note, title, content, imageUri, videoUri, tags }
                    : note
            );
            setNotes(updatedNotes);
            setSelectedNote(null);
        } else {
            const newNote = {
                id: Date.now(),
                title,
                content,
                imageUri,
                videoUri,
                tags,
            };
            setNotes([...notes, newNote]);
        }
        setTitle("");
        setContent("");
        setImageUri(null);
        setVideoUri(null);
        setTags([]);
        setModalVisible(false);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
        setModalVisible(true);
        setImageUri(note.imageUri);
        setVideoUri(note.videoUri);
        setTags(note.tags);
    };

    const handleDeleteNote = (note) => {
        const updatedNotes = notes.filter((item) => item.id !== note.id);
        setNotes(updatedNotes);
        setSelectedNote(null);
        setModalVisible(false);
    };

    const handleSearch = () => {
        const filtered = notes.filter(note => note.tags.includes(searchQuery));
        setFilteredNotes(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Workout Notes</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by tag"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>
            <ScrollView style={styles.noteList}>
                {(searchQuery ? filteredNotes : notes).map((note) => (
                    <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        {note.imageUri && (
                            <Image source={{ uri: note.imageUri }} style={{ width: 100, height: 100 }} />
                        )}
                        {note.videoUri && (
                            <Video
                                source={{ uri: note.videoUri }}
                                style={{ width: 200, height: 200 }}
                                useNativeControls={false}
                                resizeMode="cover"
                                isLooping
                            />
                        )}
                        {note.tags.length > 0 && <Text style={styles.tagsList}>Tags: {note.tags.join(', ')}</Text>}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setTitle("");
                    setContent("");
                    setImageUri(null);
                    setTags([]);
                    setModalVisible(true);
                }}
            >
                <Text style={styles.addButtonText}>Add Workout</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={false}
            >
                <ScrollView contentContainerStyle={styles.modalContainer}>
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
                    <TextInput
                        style={styles.tagsInput}
                        placeholder="Enter tags (comma-separated)"
                        value={tags.join(', ')}
                        onChangeText={(text) => setTags(text.split(',').map((tag) => tag.trim()))}
                    />
                    <View style={styles.mediaButtonsContainer}>
                        <Button title="Pick Video" onPress={pickVideo} />
                        <Button title="Pick Image" onPress={pickImage} />
                    </View>
                    {videoUri && (
                        <View>
                            <Video
                                source={{ uri: videoUri }}
                                style={{ width: 200, height: 200 }}
                                useNativeControls
                                resizeMode="contain"
                            />
                            <Button title="Remove Video" onPress={() => setVideoUri(null)} />
                        </View>
                    )}
                    {imageUri && (
                        <View>
                            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                            <Button title="Remove Image" onPress={() => setImageUri(null)} />
                        </View>
                    )}
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
                </ScrollView>
            </Modal>
        </View>
    );
};

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
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
    tagsList: {
        fontSize: 12,
        color: "#666",
        marginBottom: 10,
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
    tagsInput: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 50,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    mediaButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default App;
