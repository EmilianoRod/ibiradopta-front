"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaStar, FaRegStar, FaTimesCircle } from "react-icons/fa";  // Importar íconos

// Define el tipo de los proyectos
interface Project {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    endDate: string;
    price: string;
    isFinished: boolean;
    images: string[];
}

const ProjectManagement = () => {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [newProject, setNewProject] = useState({
        id: "",
        name: "",
        description: "",
        location: "",
        endDate: "",
        price: "",
        images: [] as File[],
        videoUrl: "", // Campo para la URL del video
    });
    const [isUploading, setIsUploading] = useState(false);  // Estado para indicar si las imágenes están subiendo
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);  // Estado para el modal de la galería
    const [projectImages, setProjectImages] = useState<string[]>([]);  // Estado para las imágenes del proyecto
    const [selectedImage, setSelectedImage] = useState<string | null>(null);  // Imagen seleccionada como principal
    const [tooltipProjectId, setTooltipProjectId] = useState<number | null>(null); // Estado para almacenar el id del proyecto en foco
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    // Cargar los proyectos al montar el componente
    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            } else {
                console.error("Error al cargar los proyectos");
            }
        };
        fetchProjects();
    }, []);

    const handleCreateProject = async () => {
        const formData = new FormData();

        /// Construir el objeto projectJson con los nuevos campos
        const projectJson = {
            name: newProject.name,
            description: newProject.description,
            location: newProject.location,  // Nuevo campo
            endDate: newProject.endDate,    // Nuevo campo
            price: newProject.price,        // Nuevo campo
            imageUrl: newProject.videoUrl,  // Establecer la URL del video
            isFinished: 0,                  // Ajusta según tus necesidades
        };

        // Añadir projectJson como string JSON al FormData
        //formData.append("projectJson", JSON.stringify(projectJson));

        formData.set(
            "projectJson",
            new Blob([JSON.stringify(projectJson)], {
                type: "application/json",
            })
        );

        // Agregar imágenes al campo 'files'
        newProject.images.forEach((file) => {
            if (file) {
                formData.append("files", file);
            }
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/save`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: formData,
        });

        if (res.ok) {
            setIsModalOpen(false);
            setNewProject({ id: "", name: "", description: "", location: "", endDate: "", price: "", videoUrl: "", images: [] }); // Limpiar formulario
            setSelectedProject(null)
            // Recargar los proyectos después de crear uno nuevo
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`);
            const data = await fetchResponse.json();
            setProjects(data);
        } else {
            console.error("Error al crear el proyecto");
        }
    };

    const handleUpdateProject = async () => {
        const formData = new FormData();

        const projectJson = {
            id: newProject.id,
            name: newProject.name,
            description: newProject.description,
            location: newProject.location,
            endDate: newProject.endDate,
            price: newProject.price,
            imageUrl: newProject.videoUrl,  // Establecer la URL del video
            isFinished: selectedProject?.isFinished, // Mantener el estado si es necesario
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/update`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(projectJson),
        });

        if (res.ok) {
            setIsModalOpen(false);
            setNewProject({ id: "", name: "", description: "", location: "", endDate: "", price: "", videoUrl: "", images: [] });
            setSelectedProject(null); // Limpiar el proyecto seleccionado
            // Recargar los proyectos después de la actualización
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`);
            const data = await fetchResponse.json();
            setProjects(data);
        } else {
            console.error("Error al actualizar el proyecto");
        }
    };

    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        setNewProject({
            id: project.id,
            name: project.name,
            description: project.description,
            location: project.location,
            endDate: project.endDate,
            price: project.price,
            videoUrl: project.imageUrl,  // Establecer la URL del video
            images: [] // Deja las imágenes vacías porque no se editarán aquí
        });
        setIsModalOpen(true); // Abrir el modal para editar
    };

    const handleDeleteProject = async (projectId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/delete/${projectId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (res.ok) {
            // Recargar los proyectos después de eliminar uno
            const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`);
            const data = await fetchResponse.json();
            setProjects(data);
        } else {
            console.error("Error al eliminar el proyecto");
        }
    };

    const openCreateModal = () => {
        setSelectedProject(null); // Limpiar el proyecto seleccionado para crear uno nuevo
        setNewProject({ id: "", name: "", description: "", location: "", endDate: "", price: "", videoUrl: "", images: [] }); // Limpiar formulario
        setIsModalOpen(true);
    };

    const openGalleryModal = (project: Project) => {
        setIsGalleryModalOpen(true);
        setSelectedProject(project)
        fetchImages(project.id);  // Cargar las imágenes del proyecto

    };

    // Función para cargar las imágenes del proyecto
    const fetchImages = async (projectId: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/id/${projectId}`);
        if (res.ok) {
            const data = await res.json();

            // Extraer las imágenes y buscar la imagen principal (imageOrder = 1)
            const images = data.images.map((image: { imageUrl: string, imageOrder: number }) => image.imageUrl);

            // Encontrar la imagen principal (imageOrder === 1)
            const mainImage = data.images.find((image: { imageOrder: number }) => image.imageOrder === 1)?.imageUrl;

            // Si hay una imagen principal, establecerla en el estado
            if (mainImage) {
                setSelectedImage(mainImage); // Establecer la imagen principal
            }

            // Asignar las imágenes al estado
            setProjectImages(images);
        } else {
            console.error("Error al cargar las imágenes del proyecto");
        }
    };

    const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            // Marca que el proceso de carga ha comenzado
            setIsUploading(true);
            Array.from(files).forEach((file) => {
                formData.append("images", file);
            });

            const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/addImages/${selectedProject?.id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: formData,
            });
            // Una vez terminada la carga, marca que la carga ha terminado
            setIsUploading(false);

            if (res.ok) {
                fetchImages(selectedProject?.id);  // Recargar imágenes después de agregar
            } else {
                console.error("Error al agregar imágenes");
            }
            // Resetear el input después de la carga
            e.target.value = "";  // Limpiar el campo de selección de archivos
        }
    };

    const handleRemoveImage = async (imageUrl: string) => {
        const formData = new FormData();
        formData.set("imageUrls", imageUrl)
            ;

        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/removeImages/${selectedProject?.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: formData
        });

        if (res.ok) {
            fetchImages(selectedProject?.id);  // Recargar imágenes después de eliminar
        } else {
            console.error("Error al eliminar la imagen");
        }
    };

    const handleSetMainImage = async (imageUrl: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/main-image/${selectedProject?.id}?mainImageId=${encodeURIComponent(imageUrl)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (res.ok) {
            setSelectedImage(imageUrl);  // Actualizar imagen principal localmente
        } else {
            console.error("Error al seleccionar la imagen principal");
        }
    };

    const handleCloseGalleryModal = () => {
        setIsGalleryModalOpen(false);
        setProjectImages([]);  // Limpiar las imágenes al cerrar el modal
    };

    const handleMouseEnter = (projectId: number) => {
        setTooltipProjectId(projectId); // Almacena el id del proyecto sobre el que pasa el mouse
    };

    const handleMouseLeave = () => {
        setTooltipProjectId(null); // Resetea el id al salir del área
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedProjects = [...projects].sort((a, b) => {
        const normalizeText = (text) => text ? text.toLowerCase().trim() : ''; // Normaliza texto

        // Obtén el valor que se va a comparar (normalizado si es texto)
        const aValue = typeof a[sortConfig.key] === 'string' ? normalizeText(a[sortConfig.key]) : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' ? normalizeText(b[sortConfig.key]) : b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });




    return (
        <div className="container mx-auto p-4">

            <h1 className="text-2xl  pt-5 font-Poppins font-bold text-yellow-500">Administración de Proyectos</h1>

            <button
                className="reportButtons mt-4"
                onClick={openCreateModal}
            >
                Crear Proyecto
            </button>

            <table className="min-w-full mt-6 table-auto border-collapse">
                <thead>
                    <tr className="bg-yellow-500">
                        <th className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort('name')}
                        >Nombre {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort('description')}
                        >Descripción {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                        <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('price')}>
                        <div className="flex justify-left items-center">
                        <span className="mr-1">Precio</span> 
                        {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </div>
                        </th>
                        <th className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort('isFinished')}
                        >Estado {sortConfig.key === 'isFinished' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-yellow-50">
                            <td className="border px-4 py-2">{project.name}</td>
                            <td className="border px-4 py-2">{project.description}</td>
                            <td className="border px-4 py-2">{project.price}</td>
                            <td
                                className="border px-4 py-2 text-center relative"
                                onMouseEnter={() => handleMouseEnter(project.id)} // Establece el proyecto en foco
                                onMouseLeave={handleMouseLeave} // Resetea el proyecto al salir
                            >
                                {project.isFinished ? (
                                    <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold py-1 px-2 rounded-full">
                                        Finalizado
                                    </span>
                                ) : (
                                    <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold py-1 px-2 rounded-full">
                                        Activo
                                    </span>
                                )}

                                {/* Tooltip con la fecha de finalización solo para el proyecto en foco */}
                                {tooltipProjectId === project.id && project.endDate && (
                                    <div className="absolute bottom-0 -left-1/2 transform -translate-x-1/2 opacity-70 bg-gray-800 text-white text-xs py-1 px-2 rounded mt-2 shadow-black shadow-md">
                                        {`Finalización: ${project.endDate}`}
                                    </div>
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600"
                                        onClick={() => openGalleryModal(project)}
                                    >
                                        Galería
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white text-xs py-1 px-2 rounded hover:bg-yellow-600"
                                        onClick={() => handleEditProject(project)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600"
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Creación/Edición de Proyecto */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-yellow-500 p-4 rounded-md w-96 shadow-black shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedProject ? "Editar Proyecto" : "Crear Proyecto"}
                        </h2>
                        {/* Campo de Nombre */}
                        <input
                            type="text"
                            placeholder="Nombre del Proyecto"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        {/* Campo de Descripción */}
                        <textarea
                            placeholder="Descripción del Proyecto"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        {/* Campo de Ubicación */}
                        <input
                            type="text"
                            placeholder="Ubicación del Proyecto"
                            value={newProject.location}
                            onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        {/* Campo de Fecha de Finalización */}
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Finalización</label>
                            <input
                                id="endDate"
                                type="date"
                                value={newProject.endDate}
                                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                className="border p-2 w-full mt-1"
                                placeholder="Selecciona la fecha en que se espera finalizar el proyecto"
                            />
                            <small className="text-gray-500 mt-1 block">Indica la fecha en que se espera finalizar el proyecto.</small>
                        </div>
                        {/* Campo de Precio */}
                        <input
                            type="number"
                            placeholder="Precio por Árbol"
                            value={newProject.price}
                            onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        {/* Campo de URL del Video */}
                        <input
                            type="url"
                            placeholder="URL del Video"
                            value={newProject.videoUrl}
                            onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        {/* Solo mostrar el input de imágenes si estamos creando un proyecto */}
                        {!selectedProject && (
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setNewProject({ ...newProject, images: Array.from(e.target.files || []) })}
                                className="border p-2 w-full mb-4"
                            />
                        )}
                        <div className="flex flex-row place-content-evenly">
                            <button
                                className=" bg-green-600 text-white p-2 rounded mt-2 hover:bg-green-700 shadow-black shadow-lg"
                                onClick={selectedProject ? handleUpdateProject : handleCreateProject} // Condicional: si hay un proyecto seleccionado, actualizar, si no, crear
                            >
                                {selectedProject ? "Actualizar Proyecto" : "Crear Proyecto"}
                            </button>
                            <button
                                className="bg-gray-500 text-white p-2 rounded mt-2 hover:bg-gray-600 shadow-black shadow-lg"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isGalleryModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-yellow-500 p-4 rounded-md w-96 shadow-black shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Galería de Imágenes</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {projectImages.map((imageUrl, index) => (
                                <div key={index} className="relative">
                                    <img src={imageUrl} alt={`image-${index}`} className="w-full h-32 object-cover mb-2 rounded-lg shadow-md shadow-black" />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        {/* Estrella para imagen principal */}
                                        <button
                                            onClick={() => handleSetMainImage(imageUrl)}
                                            className="text-yellow-500 hover:text-yellow-700 cursor-pointer mr-12 "  // Ajusta la posición según tus necesidades
                                        >
                                            {selectedImage === imageUrl ? <FaStar size={18} /> : <FaRegStar size={18} />}
                                        </button>
                                        {/* X roja para eliminar imagen */}
                                        <button
                                            onClick={() => handleRemoveImage(imageUrl)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer top-2 right-2"
                                        >
                                            <FaTimesCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {isUploading && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full flex flex-col items-center">
                                        <div className="flex items-center justify-center mb-4">
                                            {/* Puedes usar una animación de "loader" aquí */}
                                            <svg
                                                className="animate-spin h-12 w-12 text-yellow-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="#e5e7eb" />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="4"
                                                    d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-semibold text-gray-700">Cargando imágenes...</p>
                                        <p className="text-sm text-gray-500">Esto puede tardar unos momentos.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Formulario para agregar nuevas imágenes */}
                        <input
                            type="file"
                            multiple
                            onChange={handleAddImages}
                            disabled={isUploading}
                            className="border p-2 w-full mt-4 rounded"
                        />
                        <div className="flex flex-row place-content-end">
                            <button
                                className="bg-gray-500 text-white p-2 rounded mt-2 hover:bg-gray-600"
                                onClick={() => handleCloseGalleryModal()}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProjectManagement;
