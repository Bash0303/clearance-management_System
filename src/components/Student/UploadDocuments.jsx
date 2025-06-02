import { useState, useEffect } from 'react';

const UploadDocuments = () => {
  const [docType, setDocType] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [oLevel, setOLevel] = useState({
    examType: '',
    examYear: '',
    regNumber: '',
    serialNumber: '',
    cardPin: '',
  });

  useEffect(() => {
    const storedMatric = localStorage.getItem('matric_number');
    if (storedMatric) {
      setMatricNumber(storedMatric.trim());
    }
  }, []);

  const handleOLevelChange = (e) => {
    setOLevel({ ...oLevel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!docType) return alert('Please select a document type.');
    if (!matricNumber) return alert('Matric number not found. Please log in again.');

    const formData = new FormData();
    const formattedDocType = docType.toLowerCase().replace(/\s/g, '_');

    formData.append('matric_number', matricNumber);
    formData.append('document_type', formattedDocType);

    try {
      if (formattedDocType === 'o_level_details') {
        const { examType, examYear, regNumber, serialNumber, cardPin } = oLevel;

        if (!examType || !examYear || !regNumber || !serialNumber || !cardPin) {
          return alert('Please fill in all O Level details.');
        }

        formData.append('exam_type', examType);
        formData.append('exam_year', examYear);
        formData.append('reg_number', regNumber);
        formData.append('serial_number', serialNumber);
        formData.append('pin', cardPin);
      } else {
        if (!file) return alert('Please select a file to upload.');
        formData.append('file', file);
      }

      const response = await fetch(
        'http://localhost/atiba-clerance-system/uploads/upload_document.php',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.status === 'success') {
        setSuccessMessage(result.message);
        setFile(null);
        setDocType('');
        setOLevel({
          examType: '',
          examYear: '',
          regNumber: '',
          serialNumber: '',
          cardPin: '',
        });
      } else {
        alert(result.message || 'Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Student Document</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Document Type</label>
          <select
            value={docType}
            onChange={(e) => {
              setDocType(e.target.value);
              setSuccessMessage('');
            }}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Document --</option>
            <option>School Fees Payment</option>
            <option>Course Form</option>
            <option>O Level Details</option>
            <option>Library Payment</option>
            <option>State of Origin Certificate</option>
          </select>
        </div>

        {docType && docType !== 'O Level Details' && (
          <div>
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        {docType === 'O Level Details' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Exam Type</label>
              <select
                name="examType"
                value={oLevel.examType}
                onChange={handleOLevelChange}
                className="w-full border rounded p-2"
              >
                <option value="">-- Select --</option>
                <option>WAEC</option>
                <option>NECO</option>
                <option>NABTEB</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Exam Year</label>
              <input
                type="text"
                name="examYear"
                value={oLevel.examYear}
                onChange={handleOLevelChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Registration Number</label>
              <input
                type="text"
                name="regNumber"
                value={oLevel.regNumber}
                onChange={handleOLevelChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Scratch Card Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                value={oLevel.serialNumber}
                onChange={handleOLevelChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Card Pin</label>
              <input
                type="text"
                name="cardPin"
                value={oLevel.cardPin}
                onChange={handleOLevelChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadDocuments;
