const searchAlbumsAPI = async (artist) => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json(); // results é um array de objetos e cada objeto representa um dos álbuns do artista

  // console.log('results', results);

  const response = results.map( // pega cada álbum (objeto do array) e refaz apenas com as chaves que preciso (aquelas que foram desestruturadas).
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  // console.log('response', response);
  return response;
};

export default searchAlbumsAPI;
