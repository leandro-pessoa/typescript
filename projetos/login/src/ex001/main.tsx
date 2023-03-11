import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Cadastro from '../componentes/Cadastro'
import Home from '../componentes/Home'
import AlterarDados from '../componentes/AlterarDados'
import EsqueciSenha from '../componentes/EsqueciSenha'

export default function App(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Main/> }/>
          <Route path='/cadastro' element={ <Cadastro/> }/>
          <Route path='/home' element={ <Home/> }/>
          <Route path='/alterar_dados' element={ <AlterarDados/> }/>
          <Route path='/esqueci_minha_senha' element={ <EsqueciSenha/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
