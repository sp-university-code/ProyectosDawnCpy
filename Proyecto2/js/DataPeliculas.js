const tabla_peliculas = document.querySelector('#data-peliculas>tbody')


const cargarDataPeliculas = async ()=>{
  try {
    const data = await fetch('https://ghibliapi.herokuapp.com/films')
    const peliculas = await data.json()

    let text = ''
    let contador = 1
    for(let pelicula of peliculas){
      let {
        title,
        director,
        producer,
        release_date,
        running_time,
        rt_score,
        id
      } = pelicula

      text += `
        <tr>
          <td scope="row" class="text-center"><b>${contador}</b></td>
          <td class="text-center">${title}</td>
          <td class="text-center">${director}</td>
          <td class="text-center">${producer}</td>
          <td class="text-center">${release_date}</td>
          <td class="text-center">${running_time}</td>
          <td class="text-center">${rt_score}</td>
          <td class="text-center"><span class="btn-info" data-id='${id}'>Más información</span></td>
        </tr>
      `
      contador+=1
    }

    tabla_peliculas.innerHTML = text
    
  } catch (error) {
    console.error(error)
  }
}

const presentarInfoPelicula = async (id) => {
  try {
    const data = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
    const pelicula = await data.json()
    const cardPelicula = document.querySelector('#card-descripcion-pelicula')
    const descriptionPelicula = document.querySelector('#descripcion-pelicula')

    text = `
      <div class="col-md-4">
        <img src="${pelicula.image}" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${pelicula.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${pelicula.original_title_romanised}</h6>
          <p class="card-text"><b>Sinopsis:</b> ${pelicula.description}</p>
          <p class="card-text"><b>Director:</b> ${pelicula.director}</p>
          <p class="card-text"><b>Productor:</b> ${pelicula.producer}</p>
          <p class="card-text"><b>Año:</b> ${pelicula.release_date}</p>
          <p class="card-text"><b>Duracion:</b> ${pelicula.running_time} minutos</p>
          <p class="card-text"><b>Puntuacion:</b> ${pelicula.rt_score}</p>
        </div>
      </div>
    `
    descriptionPelicula.innerHTML = text
    cardPelicula.classList.remove('d-none')
  } catch (error) {
    console.error(error)
  }

  
}

cargarDataPeliculas()
  .then(()=> {
    const btnInfo = document.querySelectorAll('.btn-info')

    btnInfo.forEach(btn => btn.addEventListener('click',event=>{
      presentarInfoPelicula(event.target.getAttribute('data-id'))
    }))
  })

