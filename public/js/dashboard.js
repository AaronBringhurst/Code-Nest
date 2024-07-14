document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.getElementById('new-post-form');
    const editPostModal = document.getElementById('edit-post-modal');
    const editPostForm = document.getElementById('edit-post-form');
    const closeEditModalBtn = document.getElementById('close-edit-modal');

    // Event listener for creating a new post
    document.getElementById('new-post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const body = document.getElementById('post-content').value;
    
        try {
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });
    
            if (response.ok) {
                alert('Post created with great success!');
                window.location.href = '/dashboard';
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the post');
        }
    });

    // Event listeners for edit and delete buttons
    document.querySelectorAll('.edit-post-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.target.closest('[data-post-id]').dataset.postId;
            openEditModal(postId);
        });
    });

    document.querySelectorAll('.delete-post-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.target.closest('[data-post-id]').dataset.postId;
            deletePost(postId);
        });
    });

    // Function to open edit modal and populate it with post data
    async function openEditModal(postId) {
        try {
            const response = await fetch(`/api/posts/${postId}`);
            if (response.ok) {
                const post = await response.json();
                document.getElementById('edit-post-id').value = post.post_id;
                document.getElementById('edit-post-title').value = post.title;
                document.getElementById('edit-post-content').value = post.body;
                editPostModal.style.display = 'block';
            } else {
                alert('Failed to fetch post data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event listener for updating a post
    editPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const postId = document.getElementById('edit-post-id').value;
        const title = document.getElementById('edit-post-title').value;
        const body = document.getElementById('edit-post-content').value;

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (response.ok) {
                editPostModal.style.display = 'none';
                window.location.reload();
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Function to delete a post
    async function deletePost(postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to delete post');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // Close edit modal when clicking the close button
    closeEditModalBtn.addEventListener('click', () => {
        editPostModal.style.display = 'none';
    });

    // Close edit modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === editPostModal) {
            editPostModal.style.display = 'none';
        }
    });
});

