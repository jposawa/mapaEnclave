/*
  Coordenadas de https://docs.google.com/spreadsheets/d/19zafALbE-mchYDKZgkJR-kmxrt2_KY57FS7tzkQSMEE/htmlview
  São 15x os valores das coordenadas de http://www.swgalaxymap.com/

  No SWGalaxyMap cada lado do grid tem 1500 parsecs (pc) e cada lado mede 100 unidades do plano cartesiano dele.

  Em meu mapa to pegando as coordenadas e dividindo por 16 o que coloca cada lado do "grid" como 6,25 pontos

  Portanto cada lado passa a medir 6,25 pontos e 1 ponto passa a ser 240pc

*/

import React from 'react';
import 'leaflet/dist/leaflet.css';
import {
	MapContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
	GeoJSON,
	FeatureGroup,
	CircleMarker,
	Tooltip,
	useMapEvents
} from 'react-leaflet';
import { useControle } from '../../hooks';

import styles from './styles.module.css';

const EventosMapa = props => {
	// const {camadaPlanetas} = props;
  const [moveBusca, setMoveBusca] = React.useState(false);
	const mapa = useMap();
	const { planetasGeoJson, camadaPlanetas, setCamadaPlanetas, planetaBuscado, setPlanetaBuscado } = useControle();
	const [camadaPlanetasLocal, setCamadaPlanetasLocal] = React.useState();
	const [listaNomesPlanetas, setListaNomesPlanetas] = React.useState({});
	const referencias = [
		'Coruscant',
		'Corellia',
		'Tatooine',
		'Naboo',
		'Hosnian Prime',
		'Ilum'
	];
  const duracaoMovimentoAutomatico = 1.5;

	const colocaTexto = (texto, coord, marcPlaneta) => {
		const lista = listaNomesPlanetas;
		/* const nomeExistente = lista.filter((np) => {
      console.table({
        nomeMarc: np.options.name,
        nomeEnv: texto,
      });
      return (np.options.name === texto)
    }); */
		if (!lista[texto]) {
			const icone = L.divIcon({
				className: styles.nomePlaneta,
				html: texto,
				iconAnchor: [3.1 * texto.length, -5]
			});

			const mTexto = L.marker(coord, {
				icon: icone,
				name: texto
			}).on('click', () => {
				marcPlaneta.openPopup();
			});

			lista[texto] = mTexto;
			mTexto.addTo(mapa);
		}
	};

	const gerenciaTooltip = () => {
		const planetas = Object.values(camadaPlanetasLocal?._layers);
		const bordasMapa = mapa.getBounds();

		planetas.forEach(p => {
			// console.log(p);
			const nomePlaneta = p.options.name;
			if (
				bordasMapa.contains(p.getLatLng()) &&
				(mapa.getZoom() > 5 || referencias.includes(nomePlaneta))
			) {
				if (nomePlaneta) {
					// p.bindTooltip(nomePlaneta, {
					//   permanent: true,
					//   direction: "bottom",
					//   className: styles.etiquetaPlaneta,
					// });
					colocaTexto(nomePlaneta, p.getLatLng(), p);
				}
			} else if (!referencias.includes(p.options.name)) {
				p.unbindTooltip();
				const marcadorNomePlaneta = listaNomesPlanetas[p.options.name];

				if (marcadorNomePlaneta) {
					mapa.removeLayer(marcadorNomePlaneta);
					delete listaNomesPlanetas[p.options.name];
				}
			}
		});
	};

	React.useMemo(
		() => {
			if (planetasGeoJson) {
				const _camadaPlanetas = L.geoJson(planetasGeoJson, {
					pointToLayer: (p, latlng) => {
						const marcador = L.circleMarker(latlng, {
							radius: 5,
							weight: 1,
							color: '#eee',
							fillOpacity: 1,
							fillColor: '#369',
							name: p.properties.Name,
              id: p.id,
              className: `planeta#${p.id} ${styles.marcadorPlaneta}`,
						}).on('contextmenu', (m) => {
              const [marcDOM] = document.getElementsByClassName(`planeta#${m.target.options.id}`);
              console.log(marcDOM);
              marcDOM.classList.add(styles.marcadorSelecionado);
            });
						marcador.bindPopup(
							p.properties.Name
								? `<div><a href="${p.properties.Link}" target="blank">${
										p.properties.Name
								  }</a><p>X:${p.properties.X.toFixed(
										2
								  )}, Y:${p.properties.Y.toFixed(2)}</p></div>`
								: 'Sistema desconhecido'
						);

						return marcador;
					}
				});

				setCamadaPlanetasLocal(_camadaPlanetas);
				_camadaPlanetas.addTo(mapa);
			}
		},
		[mapa, planetasGeoJson]
	);

	React.useEffect(
		() => {
			if (camadaPlanetasLocal) {
				gerenciaTooltip();
				setCamadaPlanetas(camadaPlanetasLocal);
			}
		},
		[camadaPlanetasLocal]
	);

  React.useMemo(() => {
    if(planetaBuscado) {
      setMoveBusca(true);
      mapa.panTo(planetaBuscado.getLatLng(), {animate: true, duration: duracaoMovimentoAutomatico});
    }
  }, [planetaBuscado])

	useMapEvents({
		move: gerenciaTooltip,
    moveend: () => {
      if(moveBusca) {
        setMoveBusca(false);
        setPlanetaBuscado();
        mapa.setZoom(7, {animate: true, duration: duracaoMovimentoAutomatico});
      }
    }
	});

	return null;
};

export default function Mapa(props) {
	const { className, tamanho, cor } = props;
	const { planetas, planetasGeoJson } = useControle();
	const [marcadorTeste, setMarcadorTeste] = React.useState();
	const [map, setMap] = React.useState();
	const mapRef = React.useRef();

	const teste = e => {
		const mapa = e.target;
		console.log(mapa);
	};

	return (
		<MapContainer
			className={styles.mapa}
			center={[0, 0]}
			zoom={6}
			ref={mapRef}
			minZoom={2}
		>
			<EventosMapa />
		</MapContainer>
	);
}
