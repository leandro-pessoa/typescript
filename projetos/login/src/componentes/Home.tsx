import React, { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import '../ex001/Home.css'
import MenuIcon from '../componentes/imagens/menu-icon.svg' 
import LogoutIcon from '../componentes/imagens/logout-icon.svg'
import Settings from '../componentes/imagens/perfil-settings-icon.svg'

type Props = {

}

export default class Home extends React.Component{
    state: {
        nome: string
        sobrenome: string
        ano: number
        idade: number
        email: string
        navDisplay: string
        divNavWidth: string
    }

    constructor(props: Props){
        super(props)
        
        this.state = {
            nome: '',
            sobrenome: '',
            ano: 0,
            idade: 0,
            email: '',
            navDisplay: 'none',
            divNavWidth: '0px'
        }
    }
    getUsuarioLogado(){
        return JSON.parse(localStorage.getItem('usuario_logado') || '')
    }

    setarDados(): void{
        let dados: {nome: string, sobrenome: string, ano: number, email: string}[] = this.getUsuarioLogado()
        let data: number = new Date().getFullYear()
        this.setState({
            nome: dados[0].nome,
            sobrenome: dados[0].sobrenome,
            ano: dados[0].ano,
            idade: data - dados[0].ano,
            email: dados[0].email
        })
    }
    setDivNavPositionOnLoad(): void{
        if(window.innerWidth < 600){
            this.setState({
                divNavPosition: 'block'
            })
        }
        else{
            this.setState({
                divNavPosition: 'fixed'
            })
        }
    }
    
    aparecerMenu(): void{
        if(this.state.navDisplay == 'none'){
            this.setState({
                divNavWidth: '250px'
            })
            setTimeout(()=>{this.setState({navDisplay: 'block'})}, 150)
        }
        else{
            this.setState({
                navDisplay: 'none',
                divNavWidth: '0px'
            })
        }
    }

    sair(): void{
        localStorage.removeItem('usuario_logado')
    }

    render(): React.ReactNode {
        return(
            <div onLoad={()=>this.setarDados()}>
                <header>
                    <div className='menuIcon' onClick={()=>this.aparecerMenu()}>
                        <img src={MenuIcon} alt="ícone do menu" style={{transform: 'translate(0px, 0px)'}} className='home'/>
                    </div>
                    <div className='userEmail'>
                        {this.state.email}
                    </div>
                </header>
                <div style={{width: this.state.divNavWidth}} className='divNav'>
                <nav style={{display: this.state.navDisplay}}>
                    <p>
                        <Link to='/alterar_dados' style={{color: 'black', textDecoration: 'none'}}>
                            <img src={Settings} alt="Ícone de alteração de dados cadastrados" className='home' style={{marginRight: '5px'}}/>
                            Alterar dados
                        </Link>
                    </p>
                    <hr style={{ marginRight: '15px', marginTop: '15px'}}/>
                    <p onClick={()=>this.sair()}>
                        <Link to='/' style={{color: 'black', textDecoration: 'none'}}>
                            <img src={LogoutIcon} alt="Ícone de sair" className='home' style={{marginRight: '5px'}}/>
                            Sair
                        </Link>
                    </p>
                </nav> 
                </div>
                <div className='imagemHome'>
                    <h1>Bem-vindo(a), {this.state.nome} {this.state.sobrenome}</h1>
                </div>
            </div>
        )
    }
}
