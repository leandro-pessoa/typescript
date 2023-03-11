import React, { ChangeEvent, ReactEventHandler } from 'react'
import { Link } from 'react-router-dom'
import '../ex001/AlterarDados.css'

import Check from '../componentes/imagens/check-icon.svg'

type Props = {

}
export default class AlterarDados extends React.Component{
    msgSucesso: string
    state: {
        nome: string,
        sobrenome: string,
        email: string,
        ano: number,
        senhaAtual: string,
        senhaNova: string,
        preencha: string,
        anoInvalido: string,
        sucesso: string,
        senhaAtualIncorreta: string,
        senhasIguais: string,
        preencha02: string,
        emailInvalido: string
    }
    constructor(props: Props){
        super(props)
        this.msgSucesso = ''

        this.state = {
            nome: '',
            sobrenome: '',
            email: '',
            ano: 0,
            senhaAtual: '',
            senhaNova: '',
            preencha: 'none',
            anoInvalido: 'none',
            sucesso: '0px',
            senhaAtualIncorreta: 'none',
            senhasIguais: 'none',
            preencha02: 'none',
            emailInvalido: 'none'
        }
    }

    getUsuarioLogado(){
        return JSON.parse(localStorage.getItem('usuario_logado') || '')
    }
    setUsuarioLogado(element: object[]): void{
        localStorage.setItem('usuario_logado', JSON.stringify(element))
    }

    getCadastros(){
        return JSON.parse(localStorage.getItem('cadastros') || '')
    }
    setCadastros(element: object[]): void{
        localStorage.setItem('cadastros', JSON.stringify(element))
    }

    componentDidMount(){
        let dados: {nome: string, sobrenome: string, email: string, ano: number}[] = this.getUsuarioLogado()
        this.setState({
            nome: dados[0].nome,
            sobrenome: dados[0].sobrenome,
            email: dados[0].email,
            ano: dados[0].ano
        })
    }

    setNome(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            nome: e.target.value
        })
    }
    setSobrenome(e: ChangeEvent<HTMLInputElement>): void{
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
    setSenhaAtual(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            senhaAtual: e.target.value
        })
    }
    setSenhaNova(e: ChangeEvent<HTMLInputElement>): void{
        this.setState({
            senhaNova: e.target.value
        })
    }

    apagarStates(): void{
        this.setState({
            preencha: 'none',
            anoInvalido: 'none',
            senhaAtual: '',
            senhaNova: '',
            senhasIguais: 'none',
            senhaAtualIncorreta: 'none',
            preencha02: 'none',
            emailInvalido: 'none'
        })
    }

    apearMsg(): void{
        this.setState({
            sucesso: '35px'
        })
    }
    desapearMsg(): void{
        this.setState({
            sucesso: '0px'
        })
    }
    timingMsg(): void{
        this.apearMsg()
        setInterval(()=>this.desapearMsg(), 5000)
    }

    msgAlterado(caminho: string){
        if(caminho == 'dados'){
            return(
                <>
                    <div className='sucesso' style={{height: this.state.sucesso}}>
                        <img src={Check}/>
                        <span>Os dados foram alterados com sucesso.</span>
                    </div>
                </>
            )
        }
        else if(caminho == 'senha'){
            return(
                <>
                    <div className='sucesso' style={{height: this.state.sucesso}}>
                        <img src={Check}/>
                        <span>A senha foi alterada com sucesso.</span>
                    </div>
                </>
            )
        }   
    }
    verificacarEmail(): boolean{
        let cadastros: object[] = this.getCadastros() 
        let usuarioLogado: {email?: string}[] = this.getUsuarioLogado()
        let validacao: boolean = false
        cadastros.map(
            (dado: {email?: string}) => {
                if(this.state.email == dado.email && this.state.email != usuarioLogado[0].email){
                    validacao = true
                }
            }
        )
        return validacao
    }

    alterarDados(): void{
        let dados: object[] = this.getCadastros()
        this.msgSucesso = 'dados'
        let anoAtual: number = new Date().getFullYear()
        if(this.state.nome == '' || this.state.sobrenome == '' || this.state.email == ''){
            this.setState({
                preencha: 'block'
            })
        }
        else if(this.state.ano < 1900 || this.state.ano > anoAtual){
            this.setState({
                anoInvalido: 'block',
                preencha: 'none'
            })
        }
        else if(this.verificacarEmail()){
            this.setState({
                emailInvalido: 'block'
            })
        }
        else{
            this.apagarStates()
            let usuario_logado: {id?: number}[] = this.getUsuarioLogado()
            let selecionados: object[] = []
            dados.map(
                (dado: {id?: number, senha?: string, confSenha?: string}) => {
                    if(dado.id != usuario_logado[0].id){
                        selecionados.push(dado)
                    }
                    else{
                        selecionados.push({id: dado.id, nome: this.state.nome, sobrenome: this.state.sobrenome, email: this.state.email, ano: this.state.ano, senha: dado.senha, confSenha: dado.confSenha})
                        this.setUsuarioLogado([{id: dado.id, nome: this.state.nome, sobrenome: this.state.sobrenome, email: this.state.email, ano: this.state.ano, senha: dado.senha, confSenha: dado.confSenha}])
                    }
                }
            )
            this.setCadastros(selecionados)
            this.timingMsg()
        }
    }
    
    alterarSenha(): void{
        this.msgSucesso = 'senha'
        let dados: object[] = this.getCadastros()
        let usuario_logado: {id?: number, senha?: string}[] = this.getUsuarioLogado()
        let selecionados: object[] = []
        if(this.state.senhaAtual != usuario_logado[0].senha){
            this.setState({
                senhaAtualIncorreta: 'block',
                preencha02: 'none',
                senhasIguais: 'none'
            })
        }
        else if(this.state.senhaAtual == '' || this.state.senhaNova == ''){
            this.setState({
                preencha02: 'block',
                senhasIguais: 'none',
                senhaAtualIncorreta: 'none'
            })
        }
        else if(this.state.senhaAtual == this.state.senhaNova){
            this.setState({
                senhasIguais: 'block',
                senhaAtualIncorreta: 'none',
                preencha02: 'none'
            })
        }
        else{   
            dados.map(
                (dado: {id?: number}) => {
                    if(dado.id != usuario_logado[0].id){
                        selecionados.push(dado)
                    }
                    else{
                        selecionados.push({id: dado.id, nome: this.state.nome, sobrenome: this.state.sobrenome, email: this.state.email, ano: this.state.ano, senha: this.state.senhaNova, confSenha: this.state.senhaNova})
                        this.setUsuarioLogado([{id: dado.id, nome: this.state.nome, sobrenome: this.state.sobrenome, email: this.state.email, ano: this.state.ano, senha: this.state.senhaNova, confSenha: this.state.senhaNova}])
                    }
                }
            )
            this.apagarStates()
            this.setCadastros(selecionados)
            this.timingMsg()
        }
    }

    render(): React.ReactNode {
        return(
            <>
                <main className='container'>
                    <div className='imagem'></div>
                    <div className='conteudo'>
                        <h1 className='titulo'>Alteração de dados</h1>
                        <div className='inputs_box'>
                            <p className='p_input'>
                                <label htmlFor="nome">Nome:</label><br/>
                                <input type="text" id="nome" autoComplete='off' value={this.state.nome} className='input' onChange={(e)=>this.setNome(e)}/>
                            </p>
                            <p className='p_input'>
                                <label htmlFor="sobrenome">Sobrenome:</label><br/>
                                <input type="text" id="sobrenome" value={this.state.sobrenome}  className='input' onChange={(e)=>this.setSobrenome(e)}/>
                            </p>
                            <p className='p_input'>
                                <label htmlFor="email">E-mail:</label><br/>
                                <input type="email" id="email" autoComplete='off' value={this.state.email} className='input' onChange={(e)=>this.setEmail(e)}/>
                                <span style={{color: 'red', fontSize: '0.75em', display: this.state.emailInvalido}}>
                                    E-mail já existente
                                </span>
                            </p>
                            <p className='p_input'>
                                <label htmlFor="ano">Ano de nascimento:</label><br/>
                                <input type="number" id="ano" value={this.state.ano} className='input' onChange={(e)=>this.setAno(e)}/><br/>
                                <span style={{color: 'red', fontSize: '0.75em', display: this.state.anoInvalido}}>
                                    Ano inválido
                                </span>
                            </p>
                            <p style={{color: 'red', fontSize: '0.9em', gridColumn: '1 / 3', textAlign: 'center', display: this.state.preencha}}>
                                Preencha todos os campos
                            </p>
                            <p>
                                <button className='buttonAlterar' onClick={()=>this.alterarDados()}>
                                    Alterar
                                </button>
                            </p>
                            <fieldset>
                                <legend>Alteração de senha</legend>
                                <p className='p_input senha'>
                                    <label htmlFor="senha">Senha atual:</label><br/>
                                    <input type="password" id="senha"  value={this.state.senhaAtual} className='input' onChange={(e)=>this.setSenhaAtual(e)}/>
                                    <span style={{color: 'red', fontSize: '0.75em', display: this.state.senhaAtualIncorreta}}>
                                        Senha atual incorreta
                                    </span>
                                </p>
                                <p className='p_input' style={{gridRow: '2 / 3'}}>
                                    <button className='buttonAlterar' onClick={()=>this.alterarSenha()}>
                                        Alterar senha
                                    </button>
                                </p>
                                
                                <p className='p_input senha'>
                                    <label htmlFor="senhaNova">Senha nova:</label><br/>
                                    <input type="password" id="senhaNova"  value={this.state.senhaNova} className='input' onChange={(e)=>this.setSenhaNova(e)}/>
                                </p>
                                <p style={{gridColumn: '1 / 3', textAlign: 'center', fontSize: '0.9em', color: 'red', display: this.state.senhasIguais}}>
                                    As senhas devem ser diferentes
                                </p>
                                <p style={{gridColumn: '1 / 3', textAlign: 'center', fontSize: '0.9em', color: 'red', display: this.state.preencha02}}>
                                    Preencha todos os campos
                                </p>
                            </fieldset>
                            <div>
                                <Link to='/home'>
                                    <button className='buttonAlterar' style={{backgroundColor: '#1986C1'}}>
                                        Voltar
                                    </button>
                                </Link>
                            </div>
                        </div>
                        
                        {this.msgAlterado(this.msgSucesso)}
                    </div>
                </main>    
            </>
        )
    }
}