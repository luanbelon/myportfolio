import sunbeat from '@/assets/imgs/sunbeatenergy.png';
import overall from '@/assets/imgs/overallcontractors.png';
import caricoos from '@/assets/imgs/caricoos.png';
import ecofit from '@/assets/imgs/Ecofit.png';
import coletaFacilImg from '@/assets/imgs/coletafacil.png';
import bffdeli from '@/assets/imgs/bffdeli.png';

export const projectImageMap = {
  sunbeat,
  overall,
  caricoos,
  ecofit,
  coletafacil: coletaFacilImg,
  bffdeli,
};

export function resolveProjectImage(project) {
  if (project.imageUrl) {
    return project.imageUrl;
  }
  return projectImageMap[project.imageKey] || coletaFacilImg;
}
