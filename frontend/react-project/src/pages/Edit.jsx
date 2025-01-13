import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/Buttons/BackButton';
import { toast } from 'react-toastify';
import { BiErrorCircle } from 'react-icons/bi';
import { FaRegFileImage, FaSpinner } from 'react-icons/fa';
import Input from '../components/Input/Input';
import TagInput from '../components/Input/TagInput';
import Textarea from '../components/Input/TextArea';
import { ImSpinner2 } from 'react-icons/im'; 
import { useUser } from '../context/UserContext';
import { MdOutlinePersonOff } from 'react-icons/md';


const API_URL = "http://localhost:5000/blogs";

const Edit = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalContent, setOriginalContent] = useState('');
    const [originalImage, setOriginalImage] = useState('');
    const [originalTags, setOriginalTags] = useState([]);
    const [error, setError] = useState('');
    const [tagError, setTagError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();    
    const {user} = useUser();

    useEffect(() => {
        setError(''); 
        axios.get(`${API_URL}/${id}`)
            .then((res) => {
                const { title, content, image, tags } = res.data.blog;
                setTitle(title);
                setContent(content);
                setImage(image);
                setTags(tags);
                setOriginalTitle(title);
                setOriginalContent(content);
                setOriginalImage(image);
                setOriginalTags(tags);
            })
            .catch((e) => {
                setError("Error while fetching blog.");
            });
    }, [id]);

    if (user === null) {
          return (
            <div className="flex flex-col items-center mt-44 min-h-screen bg-zinc-900 text-white">
              <MdOutlinePersonOff className="text-6xl sm:text-8xl md:text-9xl lg:text-[100px]" />
              <h2 className="text-2xl font-bold mb-4">Access Denied!</h2>
              <p className="text-lg text-zinc-300 mb-6 text-center px-4">
                You need to be logged in to perform this action.
              </p>
            </div>
        );
    }


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            setImage(response.data.imageUrl);
            setIsImageUploaded(true);
        } catch (error) {
            console.error("Failed to change image: ", error);
        } finally{
            setLoading(false);
        }
    };

    const handleAddTag = (e) => {
        if(tags.length >= 10) {
            setTagError("You can only add up to 10 tags.");
            return;
        } else {
            setTagError('');
        }
    

        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            const formattedTag = tagInput.replace(/\s+/g, '').toLowerCase();
            if(!tags.includes(formattedTag)) {
                setTags([...tags, formattedTag]);
            } else {
                setTagError('Tag already exists.')
            }
            setTagInput('');            
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    const handleEditBlog = () => {
        const areTagsEqual = (tags1, tags2) => {
            if (tags1.length !== tags2.length) return false;
            return tags1.every((tag, index) => tag === tags2[index]);
        };
        
        if (
            title === originalTitle &&
            content === originalContent &&
            image === originalImage && 
            areTagsEqual(tags, originalTags)) {
            navigate(`/blogs/${id}`);
            return;
        }

        setIsLoading(true);
        const updatedData = { 
            title, 
            content, 
            image, 
            tags : tags.map((tag) => tag.trim().toLowerCase())
        };        

        axios.patch(`${API_URL}/${id}`, updatedData, {withCredentials: true})
        .then(() => {
            navigate(`/blogs/${id}`);
            toast.success("Blog Edited Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
        })
        .catch((e) => {
            setError('Error while submitting form');
            console.log(e);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = '${e.target.scrollHeight}px'
    }

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-2xl mx-auto">
                {error ? (
                    <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-100">
                            <BiErrorCircle size={20} />
                            <h2 className="text-lg font-semibold">{error}</h2>
                        </div>
                    </div>
                ) : (
                    <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
                        <h1 className="text-2xl font-bold text-white mb-6">Edit Blog</h1>
                        <div className="space-y-6">
                            <Input
                                label='Title'
                                name='title'
                                placeholder='Enter blog title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                error={!title ? "Title is required" : ''}
                            />

                            <Textarea
                                label="Content"
                                name="content"
                                value={content}
                                placeholder="Enter blog content"
                                onChange={handleContentChange}
                                rows={3}
                                required={true}
                                error={!content ? "Content cannot be empty" : ""}
                                maxWords={5000}
                                wordLimitError={"Content exceeds word limit"}
                            />

                            <TagInput
                                label="Tags"
                                tags={tags}
                                maxTags={10}
                                tagInput={tagInput}
                                onChange={(e) => {
                                    setTagInput(e.target.value);
                                }}
                                setTagInput={setTagInput}
                                handleAddTag={handleAddTag}
                                handleRemoveTag={handleRemoveTag}
                                error={tagError}
                            />
                            <div>
                            <label 
                                htmlFor='imageUrl'
                                className="block text-base font-bold text-gray-200 mb-2"
                            >
                                Image (Optional)
                            </label>
                            <div className="relative flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('imageUrl').click()}
                                    className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium transition duration-200 focus:outline-none 
                                        ${isImageUploaded ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    disabled={loading || isImageUploaded}
                                >
                                    {loading ? (
                                        <>
                                            <ImSpinner2 className='animate-spin' size={20}/>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaRegFileImage size={20} />
                                            <span> {isImageUploaded ? "Image Changed" : "Change Image"}</span>
                                        </>
                                    )}
                                </button>
                                
                                {image && (
                                    <span className="text-sm text-gray-400">
                                        {image.split('/').pop().length > 50
                                            ? `${image.split('/').pop().substring(0, 50)}...`
                                            : image.split('/').pop()}
                                    </span>
                                )}

                            </div>

                            <input
                                type='file'
                                name='imageUrl'
                                id='imageUrl'
                                accept="image/*"
                                onChange={handleImageUpload}
                                className='hidden'
                            />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-2">
                                <button
                                    onClick={handleEditBlog}
                                    disabled={!title || !content || content.length > 5000 || isLoading || tags.length === 0}
                                    className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                                            ${(!title || !content || content.length > 5000 || isLoading || tags.length === 0) 
                                                ? 'bg-gray-600 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'} 
                                            transition duration-200 flex items-center justify-center gap-2 order-2 lg:order-1`}
                                >
                                    {isLoading ? (
                                        <>
                                            <FaSpinner className="animate-spin" size={20}/>
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        'Update Blog'
                                    )}
                                </button>
                                <div className="w-full order-2 ">
                                    <BackButton to={`/blogs/${id}`} className='w-full py-3 rounded-lg font-semibold bg-gray-100'/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Edit;
