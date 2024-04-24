# Project 4 Simple Camera App


- Author: Nolan Stetz
- Class: CS402 Section 01
- Semester: Spring 2024


## Project Description: CameraGallery


This map has two different user interfaces. One is a preview of the picture and one is a grid view of all the pictures taken. It defaults to 
grid view as I was having trouble when I deleted all of the pictures it would get an error saying 'uri unavailable' but I believe I have resolved
this problem. It can switch camera views, add and delete pictures, share pictures which allows you to also save them to your phone, and allows you to 
switch pictures using previous or next and like I said it has two different UI's. Overall this allows the user to take pictures and scroll between them
as well as share them using existing OS tools.


### Key Features

1. **Camera Interface:** This app provides an intuitive camera interface designed for user convenience. Users can access both a camera view and a grid view to manage their photos effectively.

2. **Capture and Preview:** Users can capture photos using the built-in camera feature. The app offers a preview mode, allowing users to view captured photos and manage them easily.

3. **Switch Mode:** Users can seamlessly switch between camera mode and grid mode to capture new photos or review existing ones. The grid mode provides a comprehensive view of all captured photos.

4. **Delete Photos:** The app enables users to delete photos directly from the preview mode. Deleting a photo automatically updates the grid view, ensuring a streamlined user experience.

5. **Share Photos:** Users can share their captured photos with others using the share feature. This allows users to send photos via various communication channels such as messaging apps or social media platforms.

6. **Navigate Through Photos:** In preview mode, users can navigate through the collection of photos using the previous and next buttons. This makes it easy to browse through multiple photos without returning to the grid view.

7. **Dynamic Layout:** The app's layout adapts to different screen orientations, providing optimal viewing and usability whether in portrait or landscape mode.
  
### How to Use

- **Capture:** Tap the 'Add' button to capture a new photo using the camera.
- **Flip Camera:** Switch between the front and back camera by tapping the 'Flip' button.
- **Switch Mode:** Toggle between camera mode and grid mode by tapping the 'Switch' button.
- **Delete Photo:** In grid mode, tap on a photo to enter preview mode, then tap the 'Delete' button to remove the selected photo.
- **Share Photo:** In preview mode, the image your looking at will be the one you select, then tap the 'Share' button to share the photo with others.
- **Navigate Through Photos:** In preview mode, use the 'Previous' and 'Next' buttons to navigate through the collection of captured photos.
- **Dynamic Layout:** The app automatically adjusts its layout based on the device's orientation, providing a seamless user experience.


## General Reflection


Reflecting on this assignment I did have to bang my head a couple of times trying to get App.js and PreviewList.js to talk to each other. 
I haven't done much with 'props' but I used them a little here. It would've been impossible without them as we needed to delete images in the list and these two things had to be done in different files the way this snack is set up. I decided to make a design choice when the user deletes all of the images and that is to send them straight to grid view. This allows the user to take another picture without having problems. But I do think I resolved this for not switching back to the grid view so it should work regardless I just wanted to make sure the user has 0 problems when first using my app. I did enjoy this app the most out of all of them and felt rewarded when I reached the place where I am at now. 



