import axios from "axios";

const fetchData = async (input, setWord, setIsLoading, setIsError) => {
    // Set loading to true when starting to fetch data
    setIsLoading(true);
    setIsError(false);
  
    try {
      // Make the API request using Axios
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
  
      // Axios automatically parses the response as JSON
      const data = response.data;
  
console.log(response);

      setWord(data[0]);
  
    } catch (error) {
      // If any error occurs, set the error state to true
      setIsError(true);
      console.error('Error fetching data:', error);
    } finally {
      // Set loading to false when the fetch process is complete
      setIsLoading(false);
    }
  };

  export default fetchData;