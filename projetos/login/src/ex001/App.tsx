import React, { ChangeEvent } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'

import Email from '../componentes/imagens/email-icon.svg'
import Password from '../componentes/imagens/password-icon.svg'
import EsqueciSenha from '../componentes/EsqueciSenha'

type Props = {

}

export default class Main extends React.Component{

  forgotAltState: boolean
  forgotWidState: boolean

  state: {
    email: string,
    senha: string,
    emailIncorreto: string,
    senhaIncorreta: string,
    forgotAlt: string,
    forgotWid: string
  }
  
  constructor(props: Props){
    super(props)

    this.forgotAltState = false
    this.forgotWidState = false

    this.state = {
      email: '',
      senha: '',
      emailIncorreto: 'none',
      senhaIncorreta: 'none',
      forgotAlt: '0px',
      forgotWid: '0px'
    }
  }

  componentDidMount(): void {
    if(localStorage.getItem('cadastros') == null){
      localStorage.setItem('cadastros', JSON.stringify([]))
    }  
}
  
  getDados(){
    if(localStorage.getItem('cadastros') == null){
      localStorage.setItem('cadastros', JSON.stringify([]))
    }
    else{
      return JSON.parse(localStorage.getItem('cadastros') || '')
    }
  }

  setUsuarioLogado(element?: object[]){
    return localStorage.setItem('usuario_logado', JSON.stringify(element))
  }

  setEmail(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: e.target.value
    })
  }
  setSenha(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      senha: e.target.value
    })
  }

  setForgotAlt(): void{
    if(window.innerWidth >= 650){
      if(this.forgotWidState){
        this.forgotWidState = !this.forgotWidState
        this.setState({
          forgotAlt: '0px',
        })
      }
      else{
        this.forgotWidState = !this.forgotWidState
        this.setState({
          forgotAlt: '100%'
        })
      }
    } 
    else{
      if(this.forgotAltState){
        this.forgotAltState = !this.forgotAltState
        this.setState({
          forgotAlt: '0px'
        })
      }
      else{
        this.forgotAltState = !this.forgotAltState
        this.setState({
          forgotAlt: '100%'
        })
      }
    }
  }

  apagarStates(){
    this.setState({
      emailIncorreto: 'none',
      senhaIncorreta: 'none'
    })
  }

  entrar(): void {
    let dados: object[] = this.getDados()
    let selecionados: object[] = []
    let descartados: object[] = []
    dados.map(
      (dado: {email?: string, senha?: string}) => {
        if(this.state.email != dado.email){
          descartados.push(dado)
        }
        else if(this.state.email == dado.email){
          selecionados.push(dado)
        }
      }
    )
    if(descartados.length == dados.length){
      this.setState({
        emailIncorreto: 'block'
      })
    }
    else{
      this.setState({
        emailIncorreto: 'none'
      })
      selecionados.map(
        (dado: {email?: string, senha?: string}) => {
          if(dado.senha != this.state.senha){
            this.setState({
              senhaIncorreta: 'block'
            })
          }
          else{
            this.setUsuarioLogado(selecionados)
            this.apagarStates()
          }
        }
      )
    }
  }

  buttonEntrar(){
    let dados: object[] = this.getDados()
    let liberado: boolean = false
    let contagem: number = 0
    dados.map(
      (dado: {email?: string, senha?: string}) => {
        if(this.state.email == dado.email && this.state.senha == dado.senha){
          contagem++
        }
      }
    )
    if(contagem == 1){
      liberado = true
    }
    else{
      liberado = false
    }
    if(liberado){
      liberado = false
      return(
        <>
          <Link to='/home'> 
            <button onClick={()=>this.entrar()} className='app'>
              Entrar
            </button>
          </Link>
        </>
      )
    }
    else{
      return(
        <>
          <button onClick={()=>this.entrar()} className='app'>
            Entrar
          </button>
        </>
      )
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <EsqueciSenha alt={this.state.forgotAlt} setForgotAlt={()=>this.setForgotAlt()} wid={this.state.forgotWid} setForgotWid={()=>this.setForgotAlt()}/>
        <section className='app'>
          <div className='content'>
            <main className='app'>
              <h1 className='app'>Login</h1>
              <p style={{margin: '10px 0px', fontSize: '0.8em', textAlign: 'center'}}>Faça login para acessar sua home</p><hr/>
              <p style={{}}>
                <label htmlFor="email">
                  <img src={Email} alt="E-mail" className='app'/>
                </label>
                <input type="email" id="email" autoComplete='off' placeholder='E-mail' onChange={(e)=>this.setEmail(e)} style={{width: '75%'}}/><br/>
                <span style={{fontSize: '0.7em', color: 'red', marginRight: '30px',  display: this.state.emailIncorreto}}>
                  O e-mail está incorreto
                </span>
              </p>
              <p style={{marginBottom: '8px'}}>
                
                <label htmlFor="senha">
                  <img src={Password} alt="Senha" className='app'/>
                </label>
                <input type="password" id="senha" placeholder='Senha' onChange={(e)=>this.setSenha(e)} style={{width: '75%'}}/><br/>
                <span style={{fontSize: '0.7em', color: 'red', marginRight: '30px', display: this.state.senhaIncorreta}}>
                  A senha está incorreta
                </span>
              </p>
              <p>
                {this.buttonEntrar()}
              </p>
              <Link to='/cadastro'  style={{textDecoration:'none'}}>
                <p className='p-bottom'>Cadastrar</p>
              </Link><hr style={{margin: '4px'}}/>
              <p className='p-bottom' onClick={()=>this.setForgotAlt()}>
                Esqueci minha senha
              </p>
            </main>
          </div>
          <div className='img'></div>
        </section>
        <Outlet/>
      </>
    )
  }
}


