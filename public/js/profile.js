const checkboxChangeHandler = async function(event) {
  event.preventDefault();
  var itineraryId = event.target.getAttribute('data-id');
    var isCompleted = event.target.checked;

    // send request to mark itinerary complete to server
    try {
      const response = await fetch('/api/projects/' + itineraryId, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           completed: true,
        }),
      });

      if(response.ok) {
        if (isCompleted) {
          event.target.parentElement.classList.add('completed');
        } else {
          event.target.parentElement.classList.remove('completed');
        }
      } else {
        console.error('Failed to update itinerary');
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
// document.querySelectorAll('.completed-checkbox').forEach(function(checkbox) {
//   checkbox.addEventListener('change', async function(event) {
//     var itineraryId = event.target.getAttribute('data-id');
//     var isCompleted = event.target.checked;

//     // send request to mark itinerary complete to server
//     try {
//       const response = await fetch('/api/projects/' + itineraryId, {
//         method: 'PUT', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//            completed: isCompleted,
//         }),
//       });

//       if(response.ok) {
//         if (isCompleted) {
//           event.target.parentElement.classList.add('completed');
//         } else {
//           event.target.parentElement.classList.remove('completed');
//         }
//       } else {
//         console.error('Failed to update itinerary');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   });
// });

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
  .querySelector('#delete-btn')
  .addEventListener('click', delButtonHandler);

document
  .querySelectorAll('.completed-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', checkboxChangeHandler);
  })