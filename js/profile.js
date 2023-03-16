import {sendPostData} from './ajax.js';



// *** Activate related profile content section for clicked icon ***
const iconList = document.querySelector('.profile-icons-list');

iconList.addEventListener('click', e => {
    e.preventDefault();
    const icons = document.querySelectorAll('.profile-icons-list > i');
    const profileContentSections = document.querySelectorAll('.profile-content > div');
    
    if(e.target.tagName == 'I' && !e.target.classList.contains('active')){
        // Disable display of current profile content section
        Array.from(icons).forEach(iconNode => {
            profileContentSections.forEach(profileContentNode => {
                profileContentNode.classList.remove('active');
                // Display related contents based on selected icon (Actually this is could be the last step but this way is more optimal)
                if(profileContentNode.getAttribute('data-icon-content') == e.target.getAttribute('data-icon-content')){
                    profileContentNode.classList.add('active');
                }
            })
            // Disable current selected icon from icon list
            iconNode.classList.remove('active');
        })
        // Enlarge clicked icon from icon list
        e.target.classList.add('active');
    }
})



// *** Change password from Profile Security section (panel) ***
let changePasswordForm = document.querySelector('#profile-password-change-form');

changePasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    let formData = new FormData(changePasswordForm);
    const currentPassword = formData.get('password-current');
    const newPassword = formData.get('password-new');
    const confirmPassword = formData.get('password-new-confirm');
    
    // * Data validation of password form
    const passwordChangeDataValidation = () => {
        const currentPasswordError = document.querySelector('.profile-security-current-password');
        const newPasswordError = document.querySelector('.profile-security-new-password');
        const confirmPasswordError = document.querySelector('.profile-security-confirm-password');
        currentPasswordError.innerText = '';
        newPasswordError.innerText = '';
        confirmPasswordError.innerText = '';
        let errors = 0;

        // Current password validation
        if(currentPassword.length == 0){
            currentPasswordError.innerText = 'رمز عبور را وارد کنید';
            errors += 1;
        }

        // New password validation
        if(newPassword.length == 0){
            newPasswordError.innerText = 'رمز عبور جدید را وارد کنید';
            errors += 1;
        }
        if(1 <= newPassword.length && newPassword.length <= 4){
            newPasswordError.innerText = 'طول رمز عبور باید بیش از 4 کاراکتر باشد';
            errors += 1;
        }
        if(newPassword.length >= 15){
            newPasswordError.innerText = 'طول رمز عبور باید کمتر از 15 کاراکتر باشد';
            errors += 1;
        }
        // ConfirmPassword validation
        if(confirmPassword.length == 0){
            confirmPasswordError.innerText = 'تکرار رمز عبور را وارد کنید';
            errors += 1;
        }
        if(newPassword != confirmPassword){
            confirmPasswordError.innerText = 'تکرار رمز عبور اشتباه است';
            errors += 1;
        }
        // Compare current and new passwords
        if(currentPassword.length > 0 && newPassword.length > 0 && currentPassword === newPassword){
            currentPasswordError.innerText = 'رمز عبور جدید و قدیم نمیتواند یکسان باشند';
            errors += 1;
        }
        if(errors == 0){
            currentPasswordError.innerText = '';
            newPasswordError.innerText = '';
            confirmPasswordError.innerText = '';
            return true;
        }
        else{
            return false;
        }
    }

    // * Send data to server
    if(passwordChangeDataValidation()){
        const url = 'http://127.0.0.1:8000/password-change';
        const data = {password: currentPassword, 'new-password': newPassword};
        const error = 'پیام ارسال نشد';
        sendPostData(url, data, error)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }
})



// *** Edit profile ***
let editProfilePanel = document.querySelector('.profile-edit');
// let editProfileIcons = document.querySelectorAll('.edit-icon');
let editSubmitButton = document.querySelector('#profile-edit-submit');
let profileEditForm = document.querySelector('#profile-edit-form');

editProfilePanel.addEventListener('click', e => {
    if(e.target.classList.contains('edit-icon')){
        const editIcon = e.target;
        console.log(editIcon);
    }
})

// Array.from(editProfileIcons).forEach(editIcon => {
//     editIcon.addEventListener('click', e => {
//         Array.from(e.target.parentElement.children).forEach(elem => {
//             if(elem.tagName == 'INPUT' && elem.disabled && editSubmitButton.disabled){
//                 elem.disabled = false;
//                 editIcon.addEventListener('click', e => {
//                     elem.disabled = true;
//                     editSubmitButton.disabled = true;
//                 })
//                 elem.addEventListener('input', e => {
//                     editSubmitButton.disabled = false;
//                     profileEditForm.addEventListener('submit', e => {
//                     e.preventDefault();
//                     console.log(elem.value);
//                     elem.disabled = true;
//                     editSubmitButton.disabled = true;
//                     })
//                 })
//             }
//         })
//     })
// })
