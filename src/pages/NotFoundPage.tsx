
import { Link } from 'react-router';


 const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen text-center">
      <div className="space-y-4">
        <h1 className="font-extrabold text-indigo-700 text-9xl tracking-widest">404</h1>
        <div className="absolute bg-indigo-500 px-2 rounded text-white text-sm rotate-12">
          Страница не найдена
        </div>
        <p className="pt-2 text-gray-800 md:text-3 text-2xl t-2font-semibold">
          Упс! Вы зашли куда-то не туда.
        </p>
        <p className="text-gray-500">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="pt-6">
          <Link
            to="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium text-white text-sm active:scale-95 transition-all"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};
  


export default NotFound
