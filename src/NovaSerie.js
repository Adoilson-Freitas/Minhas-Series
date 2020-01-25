import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = ({ match }) => {
  const [form ,setForm] = useState({
    name: ''
  });
  const [succes, setSuccess] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');


  const [data, setData] = useState('');
  useEffect(() => {
    axios
    .get('/api/series/' + match.params.id)
    .then(res => {
      setData(res.data)
      setForm(res.data)
    })
    }, [match.params.id])

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
    setGenres(res.data.data)
    const genres = res.data.data
    const encontrado = genres.find(value => data.genre === value.name);
    if (encontrado) {
      setGenreId(encontrado.id)
    }
    })
  }, [data])
  

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }
  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  } 

  const save = () => {
    axios
      .post('/api/series', {
      ...form,
      genre_id: genreId
    })
      .then(res => {
        setSuccess(true)
      })
  }
  if (succes) {
    return <Redirect to='/series' />
  }

  return (
    <div>
        <div className='container'>
        <h1>Nova Série</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome do Série' />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Comentarios</label>
            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='O que você achou?' />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Gênero</label>
            <select className='form-control' onChange={onChangeGenre} value={genreId} >
             { genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>) }
            </select>
          </div>
          <div className='form-check'>
          <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
          <label className='form-check-label' htmlFor='assistido'>
            Assistido
          </label>
          </div>
          <div className="form-check">
            <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIDO'} name='status' id='paraAssistido' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')}/>
            <label className='form-check-label' htmlFor='paraAssistido'>
              Para assistir
            </label>
            </div>
          <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
        </form>
        </div>
    </div>
  )
}

export default NovaSerie;