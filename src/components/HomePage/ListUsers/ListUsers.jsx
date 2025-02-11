import {v4 as uuidv4} from 'uuid';
import {Collapse, Button, Input} from 'antd';
import {CaretRightOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import User from '../User/User';
import Spinner from '../../../ui/Spinner/Spinner';
import {useGetUsersQuery, useRemoveUserMutation} from '../../../redux/goodsApi';
import {useState} from "react";


const {Panel} = Collapse;

const ListUsers = () => {
	const {data = [], isLoading} = useGetUsersQuery();
	const [removeUser] = useRemoveUserMutation();
	const [searchTerm, setSearchTerm] = useState('');
	
	const handleDeleteUser = async (id) => {
		try {
			await removeUser(id);
		} catch (error) {
			console.error('Ошибка удаления пользователя:', error);
		}
	};
	const handleSearch = (e) => {
		if (e.keyCode === 13) {
			setSearchTerm(e.target.value)
		}
		if (e.target.value.length < 1) {
			setSearchTerm(e.target.value)
		}
	};
	
	const filteredUsers = data.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
	
	if (isLoading) return <Spinner/>;
	
	return (<div className="my-10 ml-5 mr-5">
		<div className="flex mb-4 h-[40px]">
			<Input
				placeholder="Поиск по логину"
				prefix={<SearchOutlined/>}
				onKeyUp={handleSearch}
			/>
		</div>
		<Collapse
			key={uuidv4()}
			bordered={true}
			defaultActiveKey={['0']}
			expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
			className="site-collapse-custom-collapse"
		>
			<Panel header={'Список пользователей'} key="1" className="site-collapse-custom-panel">
				{filteredUsers?.map((elem) => {
					const {id, name, password, role} = elem;
					return (<div key={id} className="flex flex-col mb-4 border-b-2 last:border-b-0">
						<User name={name} password={password} role={role}/>
						<Button
							onClick={() => handleDeleteUser(id)}
							className="mt-2"
							danger
							icon={<DeleteOutlined/>}
							iconAlign="left"
						>
							Удалить
						</Button>
					</div>);
				})}
			</Panel>
		</Collapse>
	</div>);
};

export default ListUsers;
