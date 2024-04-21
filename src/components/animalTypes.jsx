import React, { useEffect, useState, useMemo } from 'react';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import '../styles/animalTypes.css';
import Tiger from '../assets/Animal Types/tiger.jpg';
import Elephant from '../assets/Animal Types/Elephant.jpg';
import Lion from '../assets/Animal Types/lion1.jpg';
import Cheetah from '../assets/Animal Types/cheetah.jpg';
import Giraffe from '../assets/Animal Types/giraffe.jpg';
import animalSpeciesName1 from '../assets/lion.jpg';

const AnimalTypes = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [animalTypes, setAnimalTypes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}animalspecies`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimalTypes(data);
    } catch (error) {
      console.error('Error fetching Animal Types data:', error);
    }
  };

  const data = useMemo(() => animalTypes, [animalTypes]);

  const getImageForSpecies = (speciesName) => {
    switch(speciesName) {
      case 'Tiger':
        return Tiger;
      case 'Elephant':
        return Elephant;
        case 'Cheetah':
        return Cheetah;
        case 'Lion':
        return Lion;
        case 'Giraffe':
        return Giraffe;
      default:
        return 'path_to_default_image_if_needed';
    }
  };

  return (
      <div className="animal-types-container">
        <h2 className="section-title">Animal Types</h2>
        <div className="animal-card-container">
          {data.map(animalType => (
              <Link to={{
                pathname: `/animalProfile/${animalType.animalSpeciesId}`,
                state: { selectedSpecies: animalType.animalSpeciesId }
              }} key={animalType.id}>

                <Card className="animal-card">
                  <img src={getImageForSpecies(animalType.animalSpeciesName)} alt={animalType.animalSpeciesName} className="animal-image" />
                  <div className="animal-name">{animalType.animalSpeciesName}</div>
                </Card>
              </Link>
          ))}
        </div>
      </div>
  );
};

export default AnimalTypes;
