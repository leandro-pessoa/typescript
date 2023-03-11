import React, { ChangeEvent } from "react"
import { Link } from 'react-router-dom'

import '../ex001/Cadastro.css'

type PropsType = {

}

export default class Cadastro extends React.Component {
    contador: string[]
    anoAtual: number

    state: {
        nome: string,
        sobre: string,
        email: string,
        ano: number,
        senha: string,
        confSenha: string,
        preencha: string,
        senhaDiferente: string,
        emailJaExiste: string,
        anoInvalido: string
    }
    
    constructor(props: PropsType){
        super(props)
        
        this.contador = []
        this.anoAtual = new Date().getFullYear()

        this.state = {
            nome: '',
            sobre: '',
            email: '',
            ano: 2000,
            senha: '',
            confSenha: '',
            preencha: 'none',
            senhaDiferente: 'none',
            emailJaExiste: 'none',
            anoInvalido: 'none'
        }
    }

    componentDidMount(): void {
        if(localStorage.getItem('cadastros') == null){
            localStorage.setItem('cadastros', JSON.stringify([]))
        }  
    }
    
    getDados(){
        if(localStorage.getItem('cadastros') == null){
          console.log('deu ruim')
          return localStorage.setItem('cadastros', JSON.stringify([]))
        }
        else{
          return JSON.parse(localStorage.getItem('cadastros') || '')
        }
      }
    setDados(element: object): void {
        localStorage.setItem('cadastros', JSON.stringify(element))
    }

    setNome(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            nome: e.target.value
        })
    }
    setSobre(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            sobre: e.target.value
        })
    }
    setEmail(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            email: e.target.value
        })
    }
    setAno(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            ano: e.target.value
        })
    }
    setSenha(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            senha: e.target.value
        })
    }
    setConfSenha(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            confSenha: e.target.value
        })
    }
    apagarStates(): void {
        this.setState({
            nome: '',
            sobre: '',
            email: '',
            ano: 2000,
            senha: '',
            confSenha: '',
            preencha: 'none',
            senhaDiferente: 'none',
            emailJaExiste: 'none',
            anoInvalido: 'none'
        })
    }

    buttonCadastrar() {
        let dados: object[] = this.getDados()
        dados.map(
            (dado: {email?: string}) => {
                if(this.state.email == dado.email){
                    this.contador = [dado.email]
                }
            }
        )

        if(this.state.nome == '' || this.state.sobre == '' || this.state.email == '' || this.state.ano < 1900 || this.state.ano > this.anoAtual || this.state.senha == '' || this.state.confSenha == '' || this.state.senha != this.state.confSenha || this.contador[0] == this.state.email){
            return(
                <>
                    <button onClick={()=>this.cadastrar()} className='buttonCadastrar'>
                        Cadastrar
                    </button>
                </>
            )
        }
        else{
            return(
                <>
                    <Link to='/' style={{color: 'white', textDecoration: 'none', gridColumn: '1 / 1'}}>
                        <button onClick={()=>this.cadastrar()} className='buttonCadastrar'>
                            Cadastrar
                        </button>
                    </Link>
                </>
            )
        }
    }
    
    cadastrar(): void {
        if(this.state.nome == '' || this.state.sobre == '' || this.state.email == '' || this.state.senha == '' || this.state.confSenha == ''){
            this.setState({
                preencha: 'block'
            })
        }
        else if(this.state.senha != this.state.confSenha){
            this.setState({
                senhaDiferente: 'block'
            })
        }
        else if(this.contador[0] == this.state.email){
            this.setState({
                emailJaExiste: 'block'
            })
        }
        else if(this.state.ano < 1900 || this.state.ano > this.anoAtual){
            this.setState({
                anoInvalido: 'block'
            })
        }
        else{
            let dados: object[] = this.getDados()
            let id: number = Math.random() * 999999999
            let dadoNovo: object = {id: id, nome: this.state.nome, sobrenome: this.state.sobre, email: this.state.email, ano: this.state.ano, senha: this.state.senha, confSenha: this.state.confSenha}
            dados.push(dadoNovo)
            this.setDados(dados)
            this.apagarStates()
        }
    }
    render(): React.ReactNode {
        return(
            <div>
                <main className="cadastro"> 
                    <div className="imgCadastro">
                        <h1 className='h1Cadastro'>
                            Cadastro
                        </h1>
                    </div>
                    <div className="dados">
                        <p style={{gridColumn: '1 / 3', fontWeight: 'bold', color: '#0B2234', marginBottom: '10px', textShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'}}> 
                            Insira seus dados para fazer o cadastro:
                        </p>
                        <p>
                            <label htmlFor="nome">Nome:</label><br/>
                            <input type="text" id="nome" autoComplete="off" value={this.state.nome} onChange={(e)=>this.setNome(e)} className='inputCadastro'/>
                        </p>
                        <p>
                            <label htmlFor="sobrenome">Sobrenome:</label><br/>
                            <input type="text" id="sobrenome" autoComplete="off" value={this.state.sobre} onChange={(e)=>this.setSobre(e)} className='inputCadastro'/>
                        </p>
                        <p>
                            <label htmlFor="email">E-mail:</label><br/>
                            <input type="email" id="email" autoComplete="off"  placeholder='Ex: exemplo@gmail.com' value={this.state.email} onChange={(e)=>this.setEmail(e)} className='inputCadastro'/>
                            <span style={{fontSize: '0.7em', color: 'red', display: this.state.emailJaExiste}}>
                                Esse e-mail já foi registrado
                            </span>
                        </p>
                        <p>
                            <label htmlFor="ano">Ano de nascimento:</label><br/>
                            <input type="number" id="ano"  placeholder='Ex: 1990' value={this.state.ano} onChange={(e)=>this.setAno(e)} className='inputCadastro'/>
                            <span style={{fontSize: '0.7em', color: 'red', display: this.state.anoInvalido}}>
                                Ano inválido
                            </span>
                        </p>
                        <p>
                            <label htmlFor="senha">Senha:</label><br/>
                            <input type="password" id="senha" placeholder='Senha forte' value={this.state.senha} onChange={(e)=>this.setSenha(e)} className='inputCadastro'/>
                        </p>
                        <p>
                            <label htmlFor="confSenha">Confirmar senha:</label><br/>
                            <input type="password" id="confSenha"  value={this.state.confSenha} onChange={(e)=>this.setConfSenha(e)} className='inputCadastro'/>
                            <span style={{fontSize: '0.7em', color: 'red', display: this.state.senhaDiferente}}>
                                A senha não está igual
                            </span>
                        </p>
                        
                        <p style={{gridColumn: '1 / 3', color: 'red', fontSize: '0.9em', textAlign: 'center', display: this.state.preencha}}>
                            Preencha todos os campos para se cadastrar    
                        </p>
                        <p style={{gridColumn: '1 / 3'}}>
                            {this.buttonCadastrar()}
                        </p>
                        <p>
                            <Link to='/' style={{textDecoration: 'none'}}>
                                <span onClick={()=>this.apagarStates()} className='voltar'>
                                    Voltar
                                </span>
                            </Link>
                        </p>
                    </div>
                    
                    <div className="imgBottom">&copy; Leandro Pessoa</div>
                </main>
            </div>
        )
    }
}