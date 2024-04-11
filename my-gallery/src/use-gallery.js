import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useGallery = () => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const lastID = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastID + 1,
        uri: result.assets[0].uri,
      }

      setImages([... images, newImage]);
    }
  };

  const deleteImage = (imageID) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "" , [
      {
        style: "cancel",
        text: "아니요"
      },
      {
        text: "예",
        onPress: () => {
          const newImages = images.filter(image => image.id !== imageID)
          setImages(newImages)
        }
      }
    ]);
  };

  const imagesWithAddButton = [
    ... images,
    {
      id: -1,
      uri: "",
    } // 한 개 차지하는 양만 중요함
  ]

  return {
    images,
    imagesWithAddButton,
    pickImage,
    deleteImage
  };
};