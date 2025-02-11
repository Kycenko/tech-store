import { useAddCategoriesMutation } from '../../../redux/goodsApi';
import Spinner from '../../../ui/Spinner/Spinner';
import AddButton from '../../../ui/Button/AddButton/AddButton';
import { successAddCategories, errorAddCategories } from '../../../utils/list';
import InputText from '../../../ui/Input/InputText';

const FormAddCategories = () => {
  const [addCategories, isLoading] = useAddCategoriesMutation();

  const handleAddCategories = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let name = e.target.name.value;
    let visibleName = e.target.visibleName.value;
    if (name === '' || visibleName === '') {
      errorAddCategories();
    } else {
      successAddCategories();
      await addCategories({
        name: name,
        visibleName: visibleName,
      }).unwrap();
      e.target.name.value = '';
      e.target.visibleName.value = '';
      e.target.image.value = '';
    }
  };

  if (!isLoading) return <Spinner />;

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-6 text-[20px] dark:text-white'>Форма для добавление категории</div>
      <form
        onSubmit={handleAddCategories}
        className='flex flex-col max-w-[500px] border-2 p-6'
      >
      
        <InputText
          labelName={'Категория'}
          type={'text'}
          name={'visibleName'}
          placeholder={'Введите название категории'}
        />
        <AddButton text={'Добавить категорию'} />
      </form>
    </div>
  );
};

export default FormAddCategories;
