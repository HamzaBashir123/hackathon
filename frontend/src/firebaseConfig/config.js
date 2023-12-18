import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCiXCezk5jYqt7jJpaPNMeCluURo49Jujo",
    authDomain: "final-hackathon-9d712.firebaseapp.com",
    projectId: "final-hackathon-9d712",
    storageBucket: "final-hackathon-9d712.appspot.com",
    messagingSenderId: "387137222928",
    appId: "1:387137222928:web:84d840299358fbe861cd95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// const uploadImage = () => {
//     const metadata = {
//         contentType: 'image/jpeg'
//     };

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     const storageRef = ref(storage, 'images/' + file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {
//             // A full list of error codes is available at
//             // https://firebase.google.com/docs/storage/web/handle-errors
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     // User doesn't have permission to access the object
//                     break;
//                 case 'storage/canceled':
//                     // User canceled the upload
//                     break;

//                 // ...

//                 case 'storage/unknown':
//                     // Unknown error occurred, inspect error.serverResponse
//                     break;
//             }
//         },
//         () => {
//             // Upload completed successfully, now we can get the download URL
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//             });
//         }
//     );
// }

export { app, auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword, storage, ref, uploadBytesResumable, getDownloadURL }
