import React from 'react'
import { Link } from 'react-router-dom'

const NoteFoundPage = () => {
	return (
		<div className='text-[50px] font-[700]'>
			Вернуться на <Link to='/'>Главную</Link>
		</div>
	)
}

export default NoteFoundPage
