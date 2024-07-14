export function attachModalListeners() {
    const postCards = document.querySelectorAll('.post-card');
    const modal = document.getElementById('postModal');
    const closeModal = document.getElementById('closeModal');
    const commentForm = document.getElementById('commentForm');

    postCards.forEach(card => {
        card.addEventListener('click', () => openModal(card.getAttribute('data-post-id')));
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    commentForm.addEventListener('submit', handleCommentSubmit);
    console.log('Event listeners attached');
}

// Function to open the modal and fetch post data
async function openModal(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`);
        if (response.redirected){
            window.location.href = response.url
            return
        }
        if (response.ok) {
            const post = await response.json();
            populateModal(post);
            document.getElementById('postModal').style.display = 'block';
        } else {
            console.error('Failed to fetch post data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to populate the modal with post data
function populateModal(post) {
    console.log('Populating modal with post:', post);
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalBody').textContent = post.body;
    document.getElementById('modalUsername').textContent = post.username || 'Anonymous';
    document.getElementById('modalDate').textContent = new Date(post.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Populate comments
    const commentsList = document.getElementById('commentsList');

    if (post.comments && post.comments.length > 0) {
        post.comments.forEach(comment => {
            addCommentToUI(comment);
        });
    } else {
        commentsList.innerHTML = '<p class="text-sm text-gray-500">No comments yet.</p>';
    }

    document.getElementById('commentForm').setAttribute('data-post-id', post.post_id);
}

// Function to handle comment submission
async function handleCommentSubmit(event) {
    event.preventDefault();
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();
    const post_id = event.target.getAttribute('data-post-id');

    if (content && post_id) {
        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_id, content }),
            });

            if (response.ok) {
                const newComment = await response.json();
                addCommentToUI(newComment);
                commentInput.value = '';
            } else {
                const errorData = await response.json();
                console.error('Failed to submit comment:', errorData);
                alert('Failed to submit comment. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while submitting the comment. Please try again.');
        }
    } else {
        alert('Please enter a comment before submitting.');
    }
}

//this function build the comments to the modal
function addCommentToUI(comment) {
    const commentsList = document.getElementById('commentsList');
    const commentElement = document.createElement('div');
    commentElement.className = 'bg-gray-100 p-2 rounded mb-2';
    commentElement.innerHTML = `
        <p class="text-sm">${comment.content || 'No content'}</p>
        <p class="text-xs text-gray-500">By: ${comment.user ? comment.user.username : 'Anonymous'} on ${new Date(comment.createdAt).toLocaleDateString()}</p>
    `;
    commentsList.insertBefore(commentElement, commentsList.firstChild);

    const noCommentsMessage = commentsList.querySelector('p.text-gray-500');
    if (noCommentsMessage) {
        noCommentsMessage.remove();
    }
}