import Note from "../models/notes.model.js";
import sanitizeHtml from "sanitize-html";

export async function getAllNotes(req, res) {
    try {
        const allNotes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
        res.status(200).json(allNotes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ success: false, message: "Failed to fetch notes" });
    }
}

export async function getNotesById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ success: false, message: "Failed to fetch notes" });
    }
}

// CREATE a new note
export async function createNote(req, res) {
    try {
        const { title, content, createdBy } = req.body;

        if (!title || !content || !createdBy || !createdBy.name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Sanitize rich text before saving
        const cleanContent = sanitizeHtml(content, {
            allowedTags: [
                'p', 'b', 'i', 'em', 'strong', 'u', 'blockquote', 'code',
                'ul', 'ol', 'li',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'a', 'img', 'span', 'br', 'hr'
            ],
            allowedAttributes: {
                a: ['href', 'name', 'target', 'rel'],
                img: ['src', 'alt', 'title', 'width', 'height'],
                '*': ['style'] // allow inline styles safely (with restrictions below)
            },
            allowedSchemes: ['http', 'https', 'mailto'],
            allowedSchemesByTag: {
                img: ['http', 'https', 'data'] // allow base64 images (common in rich text editors)
            },
            allowProtocolRelative: true,
            // To prevent malicious CSS (like `background:url(javascript:alert(1))`)
            allowedStyles: {
                '*': {
                    // Allow only safe inline styles
                    'color': [/^#(0-9a-fA-F)+$/, /^rgb\((\d{1,3},\s?){2}\d{1,3}\)$/],
                    'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                    'font-size': [/^\d+(?:px|em|%)$/],
                    'background-color': [/^#(0-9a-fA-F)+$/, /^rgb\((\d{1,3},\s?){2}\d{1,3}\)$/]
                }
            },
            transformTags: {
                'a': (tagName, attribs) => {
                    return {
                        tagName: 'a',
                        attribs: {
                            ...attribs,
                            rel: 'noopener noreferrer', // security best practice
                            target: '_blank', // open links in new tab
                        }
                    };
                }
            }
        });

        const newNote = new Note({
            title: title.trim(),
            content: cleanContent,
            likes: 0,
            createdBy: {
                name: createdBy.name.trim(),
                socialLink: createdBy.socialLink || null,
            },
        });

        const savedNote = await newNote.save();

        res.status(201).json({ success: true, message: "Note created successfully", data: savedNote });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ success: false, message: "Failed to create note", error: error.message });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content, createdBy } = req.body;

        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: title ? title.trim() : undefined,
                content: content ? sanitizeHtml(content, {
                    allowedTags: ['p', 'b', 'i', 'em', 'strong', 'u', 'blockquote', 'code', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img'],
                }) : undefined,
                createdBy: {
                    name: createdBy ? createdBy.name.trim() : undefined,
                    socialLink: createdBy ? createdBy.socialLink : undefined,
                },
            },
            { new: true } // return the updated document
        );

        if (!updateNote) {
            res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ success: true, message: "Note updated successfully", data: updateNote });
    }
    catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, message: "Failed to update note", error: error.message });
    }
}


export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, message: "Note deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ success: false, message: "Failed to delete note", error: error.message });
    }
}

export async function likeNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note.likes += 1; // increment like count
        await note.save();

        res.json({ likes: note.likes, noteId: note._id, note: note, message: "Note liked successfully" });
    }
    catch (error) {
        console.error("Error liking note:", error);
        res.status(500).json({ success: false, message: "Failed to like note", error: error.message });
    }
}

export async function disLikeNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        note.likes -= 1; // increment like count
        await note.save();

        res.json({ likes: note.likes, noteId: note._id, note: note, message: "Note unliked successfully" });
    }
    catch (error) {
        console.error("Error liking note:", error);
        res.status(500).json({ success: false, message: "Failed to like note", error: error.message });
    }
}

// Search Notes by title, content, or creator name
export const searchNotes = async (req, res) => {
    try {
        const { q } = req.query; // e.g. /search?q=first

        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Case-insensitive regex for searching in multiple fields
        const regex = new RegExp(q, "i");

        const notes = await Note.find({
            $or: [
                { title: regex },
                { content: regex },
                { "createdBy.name": regex } // searching inside embedded object
            ]
        });

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: "No matching notes found" });
        }

        res.status(200).json({ results: notes });
    } catch (error) {
        console.error("Error searching notes:", error);
        res.status(500).json({ message: "Server error" });
    }
};
