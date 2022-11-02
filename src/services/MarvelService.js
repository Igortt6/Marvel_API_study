import {useHttp} from '../hooks/http.hooks.js'

const useMarvelService = () => {
    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ce218a4b894b49f63981041598e61335';
    const _baseOffset = 210;



    // функция выдает объект персонажами, в правильном формате.
    const getAllCharacters = async (offset = _baseOffset) => { // Синтаксис передачи аргумента. Базовый, если не передали ничего. Если передали - базовый не учитывается
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // Возвращаем новый объект со списком персонажей в нужном формате данных
        return res.data.results.map(_transformCharacter);
    }

    //Асинхронно. Запрашиваем данные с сервера, ЖДЕМ ответа, сохраняем в res
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        // возвращаем новый объект на основе res
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki:  char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter}
}


export default useMarvelService;




