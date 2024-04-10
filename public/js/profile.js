const newFormHandler = async (event) => {
  event.preventDefault();

  const itinerary_name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  console.log(itinerary_name)

  if (itinerary_name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ itinerary_name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
      alert('Created Itinerary successfully')
    } else {
      alert('Failed to create itinerary');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
      alert('Deleted Itinerary successfully')
    } else {
      alert('Failed to delete itinerary');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
