import React, { useEffect } from 'react'

function EditableInput({
    value, 
    onChange, 
    onCancel, 
    onSave, 
    isDisabled,
    reference,
    textareaClassName
}) {

  useEffect(() => {
    if (reference?.current) {
      reference.current.style.height = 'auto';
      reference.current.style.height = `${reference.current.scrollHeight}px`;
    }
  }, [value]);

  const handleFocus = (e) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`edit-input w-[90%] bg-transparent border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none resize-none overflow-hidden ${textareaClassName}`}
          ref={reference}
          rows={1}
          onFocus={handleFocus}
        />
        <div className="flex justify-end space-x-3 mt-2">
          <button 
            onClick={onCancel} 
            className="text-white text-sm hover:bg-zinc-600 rounded-lg px-3 py-1 hover:text-white"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            disabled={isDisabled} 
            className={`px-4 py-1 text-sm font-semibold rounded-lg ${!isDisabled ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditableInput