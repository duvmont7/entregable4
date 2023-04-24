import React from 'react'

const Header = ({setIsShowForm}) => {
    const handleClickShowModal = () => {
        setIsShowForm((isShowForm) => !isShowForm)
    }

  return (
    <header className='grid '>
        <h1 className=' text-3xl'>Usuarios</h1>

        <button onClick={handleClickShowModal} className="bg-purple-p text-white p-2 hover:bg-puple-p/90 transition-colors text-sm"> 
        <i className='bx bx-plus'></i>Crear nuevo usuario
        </button>
    </header>
  )
}

export default Header