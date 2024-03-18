import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

type FileType = File;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type ImageChangeHandler = (base64Images: string[]) => void;

interface UploadPhotoProps {
  onImageChange: ImageChangeHandler;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onImageChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    let previewImageUrl = file.url;
    
    if (!previewImageUrl && !file.preview) {
      previewImageUrl = await getBase64(file.originFileObj as FileType);
    }
  
    setPreviewImage(previewImageUrl || '');
    setPreviewOpen(true);
    setPreviewTitle(file.name || '');
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  
    const newFiles: File[] = [];
    const base64Images: string[] = [];
  
    for (const file of newFileList) {
      if (!file.url && !file.preview) {
        newFiles.push(file.originFileObj as File);
      }
    }
  
    // Convertir les nouveaux fichiers en base64
    for (const file of newFiles) {
      const base64 = await getBase64(file);
      base64Images.push(base64);
    }
  
    onImageChange(base64Images);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPhoto;
