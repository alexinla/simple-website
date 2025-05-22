document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! This is a demo, so no data was actually sent.');
            contactForm.reset();
        });
    }

    // CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.classList.contains('primary') ? '#features' : '#about';
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .about-content, .about-image, .contact-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .about-content, .about-image, .contact-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // DOM Elements
    const likeButtons = document.querySelectorAll('.post-actions .fa-heart');
    const commentInputs = document.querySelectorAll('.post-add-comment input');
    const commentButtons = document.querySelectorAll('.post-add-comment button');
    const storyAvatars = document.querySelectorAll('.story-avatar');
    const followButtons = document.querySelectorAll('.follow');

    // Like functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('fas');
            button.classList.toggle('far');
            if (button.classList.contains('fas')) {
                button.style.color = '#ed4956';
            } else {
                button.style.color = '';
            }
        });
    });

    // Comment functionality
    commentInputs.forEach((input, index) => {
        const button = commentButtons[index];
        
        input.addEventListener('input', () => {
            button.style.color = input.value.trim() ? '#0095f6' : '#b2dffc';
        });
        
        button.addEventListener('click', () => {
            const comment = input.value.trim();
            if (comment) {
                const commentsSection = input.closest('.post').querySelector('.post-comments');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <span class="username">your_username</span>
                    ${comment}
                `;
                commentsSection.appendChild(newComment);
                input.value = '';
                button.style.color = '#b2dffc';
            }
        });
    });

    // Story click effect
    storyAvatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Follow button functionality
    followButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Follow') {
                button.textContent = 'Following';
                button.style.color = '#262626';
            } else {
                button.textContent = 'Follow';
                button.style.color = '#0095f6';
            }
        });
    });

    // Double click to like
    document.querySelectorAll('.post-image').forEach(post => {
        post.addEventListener('dblclick', () => {
            const likeButton = post.closest('.post').querySelector('.fa-heart');
            likeButton.classList.remove('far');
            likeButton.classList.add('fas');
            likeButton.style.color = '#ed4956';
        });
    });

    // Add hover effect to posts
    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        });
        
        post.addEventListener('mouseleave', () => {
            post.style.boxShadow = 'none';
        });
    });

    // Add smooth scrolling for stories
    const storiesContainer = document.querySelector('.stories');
    let isDown = false;
    let startX;
    let scrollLeft;

    storiesContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        storiesContainer.style.cursor = 'grabbing';
        startX = e.pageX - storiesContainer.offsetLeft;
        scrollLeft = storiesContainer.scrollLeft;
    });

    storiesContainer.addEventListener('mouseleave', () => {
        isDown = false;
        storiesContainer.style.cursor = 'grab';
    });

    storiesContainer.addEventListener('mouseup', () => {
        isDown = false;
        storiesContainer.style.cursor = 'grab';
    });

    storiesContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - storiesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        storiesContainer.scrollLeft = scrollLeft - walk;
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Hashtag click functionality
    document.querySelectorAll('.hashtag').forEach(hashtag => {
        hashtag.addEventListener('click', () => {
            const tag = hashtag.textContent;
            showNotification(`Searching for ${tag}`);
            // In a real app, this would navigate to the hashtag page
        });
    });

    // Enhanced post interactions
    document.querySelectorAll('.post').forEach(post => {
        const likeButton = post.querySelector('.fa-heart');
        const bookmarkButton = post.querySelector('.fa-bookmark');
        const commentInput = post.querySelector('.post-add-comment input');
        const commentButton = post.querySelector('.post-add-comment button');
        const postImage = post.querySelector('.post-image img');

        // Double click to like
        postImage.addEventListener('dblclick', () => {
            likeButton.classList.remove('far');
            likeButton.classList.add('fas');
            likeButton.style.color = '#ed4956';
            showNotification('Post liked!');
        });

        // Bookmark functionality
        bookmarkButton.addEventListener('click', () => {
            bookmarkButton.classList.toggle('far');
            bookmarkButton.classList.toggle('fas');
            if (bookmarkButton.classList.contains('fas')) {
                showNotification('Post saved to bookmarks');
            } else {
                showNotification('Post removed from bookmarks');
            }
        });

        // Comment input validation
        commentInput.addEventListener('input', () => {
            commentButton.style.color = commentInput.value.trim() ? '#0095f6' : '#b2dffc';
            commentButton.disabled = !commentInput.value.trim();
        });

        // Enhanced comment submission
        commentButton.addEventListener('click', () => {
            const comment = commentInput.value.trim();
            if (comment) {
                const commentsSection = post.querySelector('.post-comments');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <span class="username">your_username</span>
                    ${comment}
                `;
                commentsSection.appendChild(newComment);
                commentInput.value = '';
                commentButton.style.color = '#b2dffc';
                commentButton.disabled = true;
                showNotification('Comment added!');
            }
        });
    });

    // Enhanced story interactions
    document.querySelectorAll('.story').forEach(story => {
        story.addEventListener('click', () => {
            const username = story.querySelector('span').textContent;
            showNotification(`Viewing ${username}'s story`);
            // In a real app, this would open the story viewer
        });
    });

    // Enhanced notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #262626;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Simulate new follower notification
    setTimeout(() => {
        showNotification('New follower: @instagram_user');
    }, 5000);

    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const themeToggle = document.querySelector('.theme-toggle');
    const historyItems = document.querySelectorAll('.history-item');

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            chatInput.style.height = 'auto';

            // Simulate AI response
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                addMessage(aiResponse, 'ai');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<i class="fas fa-${type === 'ai' ? 'robot' : 'user'}"></i>`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle markdown-like formatting
        const formattedContent = formatMessage(content);
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Format message content (simple markdown)
    function formatMessage(content) {
        // Convert lists
        content = content.replace(/^- (.+)$/gm, '<li>$1</li>');
        if (content.includes('<li>')) {
            content = `<ul>${content}</ul>`;
        }
        
        // Convert paragraphs
        content = content.split('\n\n').map(p => `<p>${p}</p>`).join('');
        
        return content;
    }

    // Simulate AI response
    function getAIResponse(message) {
        const responses = {
            'hello': 'Hello! How can I help you today?',
            'help': 'I can help you with various topics. Just ask me anything!',
            'web development': 'Web development involves HTML, CSS, and JavaScript. Would you like to learn more about any specific aspect?',
            'python': 'Python is a versatile programming language. What would you like to know about it?',
            'default': 'I understand. Could you please provide more details about what you\'d like to know?'
        };

        message = message.toLowerCase();
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        return responses.default;
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // New chat button
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        addMessage('Hello! I\'m your AI assistant. How can I help you today?', 'ai');
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Chat history items
    historyItems.forEach(item => {
        item.addEventListener('click', () => {
            historyItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // In a real app, this would load the selected chat
        });
    });

    // Mobile sidebar toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.chat-header').prepend(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Initial welcome message
    addMessage('Hello! I\'m your AI assistant. How can I help you today?', 'ai');
}); 