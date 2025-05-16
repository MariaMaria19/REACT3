<script>
        let users = [];
        let posts = [];
        
        async function fetchData() {
            try {
                const [usersResponse, postsResponse] = await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/users'),
                    fetch('https://jsonplaceholder.typicode.com/posts')
                ]);
                
                users = await usersResponse.json();
                posts = await postsResponse.json();
                
                displayUsers();
            } catch (error) {
                console.error('Error fetching data:', error);
                document.getElementById('users-container').innerHTML = 
                    '<p style="color: red;">Error loading users. Please try again later.</p>';
            }
        }
        
        function displayUsers() {
            const container = document.getElementById('users-container');
            
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.className = 'user-item';
                userElement.textContent = user.name;
                userElement.addEventListener('click', () => displayUserPosts(user.id));
                
                container.appendChild(userElement);
            });
        }
        
        function displayUserPosts(userId) {
            const container = document.getElementById('posts-container');
            
            // Используем filter для поиска постов пользователя
            const userPosts = posts.filter(post => post.userId === userId);
            const user = users.find(u => u.id === userId);
            
            container.innerHTML = `<h2>${user.name}'s Posts</h2>`;
            
            if (userPosts.length === 0) {
                container.innerHTML += '<p class="no-posts">No posts found for this user.</p>';
                return;
            }
            
            userPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                `;
                
                container.appendChild(postElement);
            });
        }
        
        fetchData();
    </script>
