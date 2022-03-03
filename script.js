// Rover object used to store API object and Variables
const rover = {
  array: {},
  data0: document.getElementById('data0'),
  data1: document.getElementById('data1'),
  data2: document.getElementById('data2'),
  data3: document.getElementById('data3'),
  index: 0,
  maxIndex: 101,
};

// Button Listners for Submit Prev Next and Reset
document.getElementById('submit').addEventListener('click', loadFact);

document.getElementById('next').addEventListener('click', function () {
  if (rover.index < rover.maxIndex) {
    rover.index++;
    stats();
  }
});

document.getElementById('prev').addEventListener('click', function () {
  if (rover.index > 0) {
    rover.index--;
    stats();
  }
});

document.getElementById('reset').addEventListener('click', function () {
  rover.index = 0;
  stats();
});

//  API object loading based on Date and assigning
//  it to rover object
async function loadFact() {
  let newdate = document.getElementById('date').value;
  let responce = await fetch(
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' +
      newdate +
      '&api_key=hMkrNlUhdkGVy8a51BcFnAehvBcyra0LZYpWcHHh'
  );

  let data = await responce.json();

  rover.array = Object.assign({}, data);

  stats();
}

// Retrieving Info and Picture links fron rover object

const stats = () => {
  let page = rover.index + 1;
  rover.maxIndex = rover.array.photos.length - 1;

  let result = rover.array.photos[rover.index].rover.name;
  let cameraLocation = rover.array.photos[rover.index].camera.full_name;
  let objectId = rover.array.photos[rover.index].id;
  let earthDate = rover.array.photos[rover.index].earth_date;
  let image = rover.array.photos[rover.index].img_src;

  rover.data0.innerHTML = 'Page: ' + page + ' of ' + (rover.maxIndex + 1);
  rover.data1.innerHTML = 'Camera: ' + cameraLocation;
  rover.data2.innerHTML = 'Earth Date: ' + earthDate;
  rover.data3.innerHTML = 'Object ID: ' + objectId;

  const img = document.querySelector('img');
  img.src = image;
};
