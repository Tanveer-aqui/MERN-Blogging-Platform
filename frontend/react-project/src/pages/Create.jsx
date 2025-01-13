import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/Buttons/BackButton';
import { BiErrorCircle } from 'react-icons/bi';
import Input from '../components/Input/Input';
import Textarea from '../components/Input/Textarea';
import TagInput from '../components/Input/TagInput';
import { FaRegFileImage, FaSpinner } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im'; 
import { useUser } from '../context/UserContext';
import { MdOutlinePersonOff } from 'react-icons/md';


const API_URL = "http://localhost:5000/blogs";

const Create = () => {
    const [image, setImage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    })
    const [tags, setTags] = useState([]);
    const [showTitleHint, setShowTitleHint] = useState(false);
    const [showContentHint, setShowContentHint] = useState(false);
    const [showTagHint, setShowTagHint] = useState(false);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tagInput, setTagInput] = useState('')
    const [error, setError] = useState('');
    const [tagError, setTagError] = useState('')
    const navigate = useNavigate();    
    const { user } = useUser();

    const titleRef = useRef();
    const contentREf = useRef();
    const tagRef = useRef();

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTagInput = (e) => {
        if(tags.length >= 10) {
            setTagError("You can only add up to 10 tags.");
            return;
        } else {
            setTagError('')
        }

        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            
            const formattedTag = tagInput.replace(/\s+/g, '').toLowerCase();
            
            if (!tags.includes(formattedTag)) {
                setTags([...tags, formattedTag]);
                setTagInput('');
            }
        }
    };
    

    const handleRemoveTag = (tag) => {
        setTags(tags.filter((prevTag) => prevTag !== tag));
    };

    const handleCreateBlog = () => {
        if (!formData.title || !formData.content) {
            return;
        }

        setIsLoading(true);
        const data = { 
            title: formData.title, 
            content: formData.content, 
            image,
            tags 
        };        
        
        axios.post(API_URL, data, {withCredentials: true})
            .then(() => {
                navigate('/blogs');
                toast.success("New Blog Created!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                });
            })
            .catch((e) => {
                setError('Error while creating blog.');
                console.log('Error while adding in DB...', e);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

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
            toast.success("Image uploaded successfully!");
        } catch (error) {
            toast.error("Failed to upload image.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-zinc-900 p-2 lg:p-6">
            <div className="max-w-2xl mx-auto">
                {error ? (
                    <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-100">
                            <BiErrorCircle size={20} />
                            <h2 className="text-lg font-semibold">{error}</h2>
                        </div>
                    </div>
                ) : (
                    <div className="bg-zinc-800 rounded-md p-6 shadow-lg">
                        <h1 className="text-2xl font-bold text-white mb-6">Create Blog</h1>
                        <div className="space-y-6">
                            <Input
                                ref={titleRef}
                                label='Title'
                                name='title'
                                placeholder='Enter blog title'
                                value={formData.title}
                                onChange={(e) => {
                                    handleChange(e);                               
                                    setShowTitleHint(false);
                                }}
                                required
                                onClick={() => setShowTitleHint(true)}
                                onBlur={() => setShowTitleHint(false)}                                
                            />
                            {!formData.title && showTitleHint &&  <span className="text-[#FF6961] font-normal text-base ml-4">Title is required</span>}

                            <Textarea
                                ref={contentREf}
                                label="Content"
                                name="content"
                                value={formData.content}
                                placeholder="Enter blog content"
                                onChange={(e) => {
                                    handleChange(e);
                                    setShowContentHint(false)
                                }}
                                rows={3}
                                required={true}
                                maxWords={5000}
                                wordLimitError={"Content exceeds word limit"}
                                onClick={() => setShowContentHint(true)}
                                onBlur={() => setShowContentHint(false)}    
                            />
                            {!formData.content && showContentHint &&  <span className="text-[#FF6961] font-normal text-base ml-4">Content cannot be empty</span>}

                            <TagInput
                                ref={tagRef}
                                label="Tags"
                                tags={tags}
                                maxTags={10}
                                tagInput={tagInput}
                                onChange={(e) => {
                                    setTagInput(e.target.value);
                                    setShowTagHint(false);
                                }}
                                handleAddTag={handleTagInput}
                                handleRemoveTag={handleRemoveTag}
                                error={tagError}
                                onClick={() => setShowTagHint(true)}
                                onBlur={() => setShowTagHint(false)} 
                            />
                            {tags.length === 0 && showTagHint &&  <span className="text-[#FF6961] font-normal text-base ml-4">Atleast one tag is required</span>}

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
                                            <span> {isImageUploaded ? "Image Uploaded" : "Upload Image"}</span>
                                        </>
                                    )}
                                </button>
                                
                                {image && (
                                    <span className="text-sm text-gray-400">
                                        {image.split('/').pop()}
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
                                    onClick={handleCreateBlog}
                                    disabled={!formData.title || !formData.content || formData.content.length > 5000 || tags.length === 0}
                                    className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                                                ${(!formData.title || !formData.content || formData.content.length > 5000 || tags.length === 0) 
                                                    ? 'bg-gray-600 cursor-not-allowed' 
                                                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'} 
                                                transition duration-200 flex items-center justify-center gap-2 order-2 lg:order-1`}
                                >
                                    {isLoading ? (
                                       <>
                                            <FaSpinner className='animate-spin' size={20}/>
                                            <span>Creating...</span>
                                       </>
                                    ) : (
                                        'Create Blog'
                                    )}
                                    
                                </button>
                                <div className="w-full order-2">
                                    <BackButton to="/blogs" className="w-full py-3 rounded-lg font-semibold bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Create;