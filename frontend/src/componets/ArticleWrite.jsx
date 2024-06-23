import React, { useState, useEffect } from 'react';
import { FaImages } from "react-icons/fa";

const ArticleWrite = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: [],
    code: '',
    link: '',
    bold: false,
    italic: false
  });
  const [showForm, setShowForm] = useState(false); 
  const [showCodeInput, setShowCodeInput] = useState(false); 
  const [showLinkInput, setShowLinkInput] = useState(false); 

  useEffect(() => {
    fetch('/api/articles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files)
    });
  };

  const handleCodeClick = () => {
    setShowCodeInput(!showCodeInput);
    setShowLinkInput(false); 
  };

  const handleBoldClick = () => {
    setFormData({
      ...formData,
      bold: !formData.bold
    });
  };

  const handleItalicClick = () => {
    setFormData({
      ...formData,
      italic: !formData.italic
    });
  };

  const handleLinkClick = () => {
    setShowLinkInput(!showLinkInput);
    setShowCodeInput(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData[key].forEach(image => data.append('images', image));
      } else {
        data.append(key, formData[key]);
      }
    });

    fetch('/api/create', {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(newArticle => {
      setArticles([...articles, newArticle]);
      setFormData({
        title: '',
        content: '',
        images: [],
        code: '',
        link: '',
        bold: false,
        italic: false
      });
      // setShowForm(false); 
      setShowCodeInput(false); 
      setShowLinkInput(false); 
    })
    .catch(error => console.error('Error creating article:', error));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='py-4 bg-slate-50 border-b flex justify-between items-center px-1'>
        <div className='flex gap-2'>
          <img src="https://media.licdn.com/dms/image/D4D03AQFuQjfHlyjjXg/profile-displayphoto-shrink_100_100/0/1718425981910?e=1724284800&v=beta&t=CG_OpSN19eN1y925HTvAhWjVk4b8vwyLDR4o_6RHyp0" alt="" className='w-14 h-14 rounded-full' />
          <div>
            <h3>Waleed Ahmad</h3>
            <p>Individual article</p>
          </div>
        </div>

        <div className='w-[40%] flex justify-evenly h-full items-center bg-gray-300 py-2 rounded-xl'>
          <p className='font-extrabold cursor-pointer' onClick={handleBoldClick}>B</p>
          <p className='italic cursor-pointer' onClick={handleItalicClick}>I</p>
          <p className='cursor-pointer' onClick={handleCodeClick}>{'{}'}</p>
          <p className='cursor-pointer' onClick={handleLinkClick}>{'<>'}</p>
          <FaImages className='cursor-pointer' onClick={() => document.getElementById('fileInput').click()} />
          <input
            type='file'
            id='fileInput'
            className='hidden'
            multiple
            onChange={handleFileChange}
          />
        </div>

        <button className='py-2 px-4 bg-blue-700 text-white rounded-lg' onClick={toggleForm}>
          {showForm ? 'Show All' : 'Write Article'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 w-[70vw] mx-auto">
          <h1 className="text-2xl font-bold mb-6">Write a New Article</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex gap-2 items-center">
              <label className="text-gray-700 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="border-none outline-none rounded-lg w-full py-2 px-3"
              />
            </div>
            <div className="mb-6 flex items-center gap-1 relative pl-20">
              <label className="text-gray-700 font-semibold absolute top-1 left-0">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={`border-none outline-none rounded-lg w-full py-2 px-3 h-20
                  ${formData.bold ? 'font-extrabold' : ''} ${formData.italic ? 'italic' : ''}`}
              ></textarea>
            </div>
            {showCodeInput && (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Code</label>
                <textarea
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="border-none rounded-lg w-full py-4 px-3 focus:outline-none bg-black text-white"
                />
              </div>
            )}
            {showLinkInput && (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            )}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="bold"
                checked={formData.bold}
                onChange={handleInputChange}
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 font-semibold">Bold</label>
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="italic"
                checked={formData.italic}
                onChange={handleInputChange}
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 font-semibold">Italic</label>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Article
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : articles.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-6">Articles</h2>
              <ul className="space-y-6">
                {articles.map(article => (
                  <li key={article._id} className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold">{article.title}</h3>
                    <p className="mt-2">{article.content}</p>
                    {article.images.length > 0 && (
                      <div className="flex flex-wrap mt-4">
                        {article.images.map((image, index) => (
                          <img
                            key={index}
                            src={`/uploads/${image}`}  
                            alt={`Article image ${index + 1}`}
                            className="w-full h-auto max-w-xs mx-auto"
                          />
                        ))}
                      </div>
                    )}
                    {article.code && <pre className="bg-gray-100 p-2 rounded mt-4">{article.code}</pre>}
                    {article.link && <a href={article.link} className="text-blue-500 underline mt-4">{article.link}</a>}
                    {article.bold && <p className="font-bold mt-4">Bold Text</p>}
                    {article.italic && <p className="italic mt-4">Italic Text</p>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No articles yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleWrite;
