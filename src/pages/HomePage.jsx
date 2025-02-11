import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className="min-h-screen bg-cover  bg-no-repeat" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80)` }}>
			<div className="bg-cover bg-center py-24">
				<div className="container mx-auto px-4 text-center text-white">
					<h3 className="text-3xl lg:text-5xl font-bold text-white text-center mb-6">Добро пожаловать в интернет-магазин по продаже электроники</h3>
					<h3 className="text-2xl lg:text-6xl font-bold text-white text-center mb-6">TechShop</h3>
					<p className="text-lg lg:text-2xl mb-8 text-center">Широкий ассортимент товаров по лучшим ценам!</p>
					<Link
						to="/goods"
						className="bg-blue-600 hover:bg-blue-700 hover:text-white  text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out inline-block"
					>
						Посмотреть товары
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
