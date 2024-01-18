document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
        userList.innerHTML = '';
        reposList.innerHTML = '';
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      const userSearchUrl = `https://api.github.com/search/users?q=${username}`;
  
      fetch(userSearchUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}"> <a href="#" data-username="${user.login}">${user.login}</a>`;
        userList.appendChild(listItem);
  
        listItem.addEventListener('click', () => {
          const username = user.login;
          fetchUserRepos(username);
        });
      });
    }
  
    function fetchUserRepos(username) {
      const reposUrl = `https://api.github.com/users/${username}/repos`;
  
      fetch(reposUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        displayUserRepos(data);
      })
      .catch(error => console.error('Error fetching user repos:', error));
    }
  
    function displayUserRepos(repos) {
      reposList.innerHTML = '';  
  
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
      });
    }
  });
  