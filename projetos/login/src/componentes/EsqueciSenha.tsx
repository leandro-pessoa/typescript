import React, { ChangeEvent, EventHandler } from 'react'
import { Link } from 'react-router-dom'

import '../ex001/EsqueciSenha.css'

import Check from '../componentes/imagens/check-icon.svg'

type Props = {
    alt: string,
    setForgotAlt: any,
    wid: string,
    
}

export default class EsqueciSenha extends React.Component<Props>{

    anoAtual: number
    dadoEncontrado: {id?: number, nome?: string, sobrenome?: string, email?: string, ano?: number}[]

    state: {
        nome: string,
        sobrenome: string,
        email: string,
        ano: number,
        caixaSenha: string,
        buttonContinuar: string,
        senhaNova: string,
        confSenhaNova: string,
        preencha: string,
        dadosInvalidos: string,
        anoInvalido: string,
        senhasDiferentes: string,
        sucesso: string
    }
    constructor(props: Props){
        super(props)

        this.anoAtual = new Date().getFullYear()
        this.dadoEncontrado = []

        this.state = {
            nome: '',
            sobrenome: '',
            email: '',
            ano: 2000,
            caixaSenha: 'none',
            buttonContinuar: 'block',
            senhaNova: '',
            confSenhaNova: '',
            preencha: 'none',
            dadosInvalidos: 'none',
            anoInvalido: 'none',
            senhasDiferentes: 'none',
            sucesso: 'none'
        }
    }

    getDados(): object[]{
        return JSON.parse(localStorage.getItem('cadastros') || '')
    }
    setDados(element: object[]): void{
        localStorage.setItem('cadastros', JSON.stringify(element))
    }

    setNome(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            nome: e.target.value
        })
    }
    setsobrenome(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            sobrenome: e.target.value
        })
    }
    setEmail(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            email: e.target.value
        })
    }
    setAno(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            ano: e.target.value
        })
    }
    setSenhaNova(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            senhaNova: e.target.value
        })
    }
    setConfSenhaNova(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            confSenhaNova: e.target.value
        })
    }

    apearSucesso(): void{
        this.setState({
            sucesso: 'block'
        })
    }
    desapearSucesso(): void{
        this.setState({
            sucesso: 'none'
        })
    }
    timing(): void{
        this.apearSucesso()
        setInterval(()=>this.desapearSucesso(), 5000)
    }

    apagarStates(): void{
        this.setState({
            nome: '',
            sobrenome: '',
            email: '',
            ano: 2000,
            senhaNova: '',
            confSenhaNova: '',
            buttonContinuar: 'block',
            caixaSenha: 'none'
        })
    }

    usuarioExistente(): boolean{
        let dados: object[] = this.getDados()
        let selecionado: object[] = []
        dados.map(
            (dado: {nome?: string, sobrenome?: string, email?: string, ano?: number}) => {
                if(this.state.nome == dado.nome && this.state.sobrenome == dado.sobrenome && this.state.email == dado.email && this.state.ano == dado.ano){
                    selecionado.push(dado)
                    this.dadoEncontrado.push(dado)
                }
            }
        )
        if(selecionado.length > 0){
            return true
        }
        else{
            return false
        }
    }

    aparecerCaixaSenha(): void{
        this.setState({
            buttonContinuar: 'none',
            caixaSenha: 'block'
        })
    }

    continuar(): void{
        if(this.state.nome == '' || this.state.sobrenome == '' || this.state.email == ''){
            this.setState({
                preencha: 'block',
                dadosInvalidos: 'none'
            })
        }
        else if(this.state.ano < 1900 || this.state.ano > this.anoAtual){
            this.setState({
                anoInvalido: 'block',
                preencha: 'none'
            })
        }
        else if(this.usuarioExistente()){
            this.setState({
                preencha: 'none',
                dadosInvalidos: 'none',
                anoInvalido: 'none'
            })
            this.aparecerCaixaSenha()
        }
        else{
            this.setState({
                preencha: 'none',
                dadosInvalidos: 'block'
            })
        }
    }

    mudarSenha(): void{
        let dados: object[] = this.getDados()
        let selecionados: object[] = []
        if(this.state.senhaNova != this.state.confSenhaNova){
            this.setState({
                senhasDiferentes: 'block'
            })
        }
        else{
            this.setState({
                senhasDiferentes: 'none'
            })
            dados.map(
                (dado: {id?: number}) => {
                    if(this.dadoEncontrado[0].id == dado.id){
                        selecionados.push({id: this.dadoEncontrado[0].id,nome: this.dadoEncontrado[0].nome, sobrenome: this.dadoEncontrado[0].sobrenome, email: this.dadoEncontrado[0].email, ano: this.dadoEncontrado[0].ano, senha: this.state.senhaNova, confSenha: this.state.confSenhaNova})
                    }
                    else{
                        selecionados.push(dado)
                    }
                }
            )
            this.setDados(selecionados)
            this.timing()
            this.apagarStates()
            this.props.setForgotAlt()
        }                             
    }   

    render(): React.ReactNode {
        return(
            <>
                <div className='corpo' style={{height: this.props.alt}}>
                    <div>
                        <button className='esqueciX' onClick={()=>this.props.setForgotAlt()} onMouseDown={()=>this.apagarStates()}>
                            X
                        </button>
                    </div>
                    <div>
                        <h1 className='esqueciH1'>Mudança de senha</h1>
                        <p className='esqueciTxt'>
                            Digite seus dados para mudar a senha:
                        </p><hr style={{margin: '0px 15px'}}/>
                    </div>
                    <div className='esqueciBoxInputs'>
                        <p>
                            <label htmlFor="nome">Nome:</label><br/>
                            <input type="text" id="nome" autoComplete='off' className='esqueciInput' value={this.state.nome} onChange={(e)=>this.setNome(e)}/>
                        </p>
                        <p>
                            <label htmlFor="sobrenome">Sobrenome:</label><br/>
                            <input type="text" id="sobrenome" className='esqueciInput' value={this.state.sobrenome} onChange={(e)=>this.setsobrenome(e)}/>
                        </p>
                        <p>
                            <label htmlFor="mudEmail">E-mail:</label><br/>
                            <input type="email" id="mudEmail" autoComplete='off' className='esqueciInput' value={this.state.email} onChange={(e)=>this.setEmail(e)}/>
                        </p>
                        <p>
                            <label htmlFor="ano">Ano de nascimento:</label><br/>
                            <input type="text" id="ano" className='esqueciInput' value={this.state.ano} onChange={(e)=>this.setAno(e)}/>
                            <span style={{color: 'red', fontSize: '0.7em', display: this.state.anoInvalido}}>
                                Ano inválido
                            </span>
                        </p>
                        <p style={{gridColumn: '1 / 3', textAlign: 'center', color: 'red', fontSize: '0.9em', marginTop: '5px', display: this.state.preencha}}>
                            Preencha todos os campos para prosseguir.
                        </p>
                        <p style={{gridColumn: '1 / 3', textAlign: 'center', color: 'red', fontSize: '0.9em', marginTop: '5px', display: this.state.dadosInvalidos}}>
                            Esses dados são inválidos ou inexistentes.
                        </p>
                        <p>
                            <button className='esqueciButton' onClick={()=>this.continuar()} style={{display: this.state.buttonContinuar}}>
                                Continuar
                            </button>
                        </p>
                        <div style={{gridColumn: '1 / 3', display: this.state.caixaSenha}}>
                            <fieldset style={{gridTemplateColumns: '50% 50%'}}>
                                <legend>Mudar senha</legend>
                                <p>
                                    <label htmlFor="mudSenha">Senha nova:</label><br/>
                                    <input type="password" id="mudSenha" className='esqueciInput' value={this.state.senhaNova} onChange={(e)=>this.setSenhaNova(e)}/>
                                </p>
                                <p>
                                    <label htmlFor="mudConfSenha">Confirmar senha:</label>
                                    <input type="password" id="mudConfSenha" className='esqueciInput'  value={this.state.confSenhaNova} onChange={(e)=>this.setConfSenhaNova(e)}/>
                                    <span style={{color: 'red', fontSize: '0.7em', display: this.state.senhasDiferentes}}>
                                        A senhas não estão iguais
                                    </span>
                                </p>
                                <p>
                                    <button className='esqueciButton' onClick={()=>this.mudarSenha()}>
                                        Mudar senha
                                    </button>
                                </p>
                            </fieldset>
                        </div>
                    </div>
                    <div className='sucesso02' style={{height: '35px', display: this.state.sucesso}}>
                        <img src={Check} style={{transform: 'translate(2px, 6px)'}}/> A senha foi alterada com sucesso
                    </div>
                </div>
            </>
        )
    }
}
 