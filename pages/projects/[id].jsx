import Image from 'next/image';
import { FiClock, FiTag, FiGithub } from 'react-icons/fi';
import PagesMetaHead from '../../components/PagesMetaHead';
import { projectsData } from '../../data/projectsData';
import RelatedProjects from '../../components/projects/RelatedProjects';
import Link from 'next/link';

function ProjectSingle(props) {
	return (
		<div className="container mx-auto">
			<PagesMetaHead title={props.project.title} />

			{/* Header */}
			<div>
				<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
					{props.project.ProjectHeader.title}
				</p>
				<div className="flex">
					<div className="flex items-center mr-10">
						<FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
						<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
							{props.project.ProjectHeader.publishDate}
						</span>
					</div>
					<div className="flex items-center">
						<FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
						<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
							{props.project.ProjectHeader.tags}
						</span>
					</div>
				</div>
			</div>

			{/* Gallery */}
			<div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
				{props.project.ProjectImages.map((project) => {
					return (
						<div className="mb-10 sm:mb-0" key={project.id}>
							<Image
								src={project.img}
								className="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
								alt={project.title}
								key={project.id}
								layout="responsive"
								width={100}
								height={90}
							/>
						</div>
					);
				})}
			</div>

			{/* Info */}
			<div className="block sm:flex gap-0 sm:gap-10 mt-14">
				<div className="w-full sm:w-1/3 text-left">
					{/* Single project client details */}
					<div className="mb-7">
						<p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2">
							{props.project.ProjectInfo.ClientHeading}
						</p>
						<ul className="leading-loose">
							{props.project.ProjectInfo.CompanyInfo.map(
								(info) => {
									return (
										<li
											className="font-general-regular text-ternary-dark dark:text-ternary-light"
											key={info.id}
										>
											<span>{info.title}: </span>
											<a
												href="https://stoman.me"
												className={
													info.title === 'Website' ||
													info.title === 'Phone'
														? 'hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300'
														: ''
												}
												aria-label="Project Website and Phone"
											>
												{info.details}
											</a>
										</li>
									);
								}
							)}
						</ul>
					</div>

					{/* Single project objectives */}
					<div className="mb-7">
						<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
							{props.project.ProjectInfo.ObjectivesHeading}
						</p>
						<p className="font-general-regular text-primary-dark dark:text-ternary-light">
							{props.project.ProjectInfo.ObjectivesDetails}
						</p>
					</div>

					{/* Single project technologies */}
					<div className="mb-7">
						<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
							{props.project.ProjectInfo.Technologies[0].title}
						</p>
						<p className="font-general-regular text-primary-dark dark:text-ternary-light">
							{props.project.ProjectInfo.Technologies[0].techs.join(
								', '
							)}
						</p>
					</div>

					{/* Single project social sharing 
						IG: deleted code for social sharing
					*/}
				</div>

				{/*  Single project right section details */}
				<div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
					<p className="text-primary-dark dark:text-primary-light text-2xl font-bold mb-7">
						{props.project.ProjectInfo.ProjectDetailsHeading}
					</p>
					{props.project.ProjectInfo.ProjectDetails.map((details) => {
						return (
							<p
								key={details.id}
								className="font-general-regular mb-5 text-lg text-ternary-dark dark:text-ternary-light"
							>
								{details.details}
							</p>
						);
					})}
				</div>
			</div>

			<RelatedProjects />
		</div>
	);
}

/*
export async function getServerSideProps({ query }) {
	const { id } = query;
	return {
		props: {
			project: projectsData.filter(
				(project) => project.id === parseInt(id)
			)[0],
		},
	};
}

// export default ProjectSingle;
*/

// IG: added to adjust code for static export
export async function getStaticPaths() {
	// Generate a list of paths (one for each project)
	const paths = projectsData.map((project) => ({
	  params: { id: project.id.toString() },  // Ensure id is a string, as it’s a dynamic route
	}));
  
	return { paths, fallback: false };  // You can use true/false for fallback depending on your needs
  }


// IG: added to adjust code for static export
export async function getStaticProps({ params }) {
	const { id } = params;  // Access the dynamic route parameter
  
	// Filter the project based on the id (this can be adjusted based on your data source)
	const project = projectsData.filter((project) => project.id === parseInt(id))[0];
  
	return {
	  props: {
		project,
	  },
	};
  }
  
// IG: added to adjust code for static export
  function ProjectPage({ project }) {
	if (!project) {
	  return <p>Project not found.</p>;
	}
  
	return (
		<div className="container mx-auto">
		<PagesMetaHead title={project.title} />

		{/* Header */}
		<div>
			<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
				{project.ProjectHeader.title}
			</p>
			<div className="flex">
				<div className="flex items-center mr-10">
					<FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{project.ProjectHeader.publishDate}
					</span>
				</div>
				<div className="flex items-center">
					<FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{project.ProjectHeader.tags}
					</span>
				</div>
			</div>
		</div>

		{/* Gallery */}
		<div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
			{project.ProjectImages.map((project) => {
				return (
					<div className="mb-10 sm:mb-0" key={project.id}>
						<Image
							src={project.img}
							className="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
							alt={project.title}
							key={project.id}
							layout="responsive"
							width={100}
							height={90}
						/>
					</div>
				);
			})}
		</div>

		{/* Info */}
		<div className="block sm:flex gap-0 sm:gap-10 mt-14">
			<div className="w-full sm:w-1/3 text-left">
				{/* Single project client details 

				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2">
						{project.ProjectInfo.ClientHeading}
					</p>
					<ul className="leading-loose">
						{project.ProjectInfo.CompanyInfo.map(
							(info) => {
								return (
									<li
										className="font-general-regular text-ternary-dark dark:text-ternary-light"
										key={info.id}
									>
										<span>{info.title}: </span>
										<a
											href="https://stoman.me"
											className={
												info.title === 'Website' ||
												info.title === 'Phone'
													? 'hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300'
													: ''
											}
											aria-label="Project Website and Phone"
										>
											{info.details}
										</a>
									</li>
								);
							}
						)}
					</ul>
				</div>
				*/}
				{/* Single project objectives */}
				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						{project.ProjectInfo.ObjectivesHeading}
					</p>
					<p className="font-general-regular text-primary-dark dark:text-ternary-light">
						{project.ProjectInfo.ObjectivesDetails}
					</p>
				</div>

				{/* Single project technologies */}
				<div className="mb-7">
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						{project.ProjectInfo.Technologies[0].title}
					</p>
					<p className="font-general-regular text-primary-dark dark:text-ternary-light">
						{project.ProjectInfo.Technologies[0].techs.join(
							', '
						)}
					</p>
				</div>
					{/* Single project social sharing 
						IG: deleted code for social sharing
					*/}
				{/* Github link to project */}
				<div>
					<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
						{project.ProjectInfo.GithubHeading}<FiGithub className="inline md:pl-2 rounded-lg shadow-sm duration-500 text-3xl" />
					</p>
					<div className="flex items-center gap-3">
						<Link
							// key={index}
							href={project.ProjectInfo.GithubLink}
							target="__blank"
							passHref={true}
							aria-label="Github Repo"
							// className="bg-ternary-light dark:bg-ternary-dark text-ternary-dark hover:text-primary- dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
							className="text-ternary-dark hover:text-primary-dark dark:text-ternary-light dark:hover:text-primary-light font-general-regular"
						>
							<span>{project.ProjectInfo.GithubLink.split('://')[1]}</span>
						</Link>
					</div> 
				</div>
			</div>


			{/*  Single project right section details */}
			<div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0">
				<p className="text-primary-dark dark:text-primary-light text-2xl font-bold mb-7">
					{project.ProjectInfo.ProjectDetailsHeading}
				</p>
				{project.ProjectInfo.ProjectDetails.map((details) => {
					return (
						<p
							key={details.id}
							className="font-general-regular mb-5 text-lg text-ternary-dark dark:text-ternary-light"
						>
							{details.details}
						</p>
					);
				})}
			</div>
		</div>

		<RelatedProjects />
	</div>
	);
  }


export default ProjectPage;