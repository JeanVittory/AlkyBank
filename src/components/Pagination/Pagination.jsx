import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IconButton } from 'src/components/IconButton';
import { Select } from 'src/components/Select';
import { range } from 'src/utils/range';

export const Pagination = ({
	className = '',
	totalPages,
	currentPage,
	onChangePage,
	changeItemsPerPage,
	itemsPerPag,
}) => {
	return (
		<div data-testid="pagination" className={`${className} grid grid-cols-[auto_1fr_auto] gap-2 rounded-md `}>
			<IconButton
				className=" bg-ct-special1-600 text-ct-neutral-light-800"
				disabled={!(currentPage > 1)}
				onClick={() => onChangePage(currentPage - 1)}
				icon={MdNavigateBefore}
			/>

			<div className="grid grid-cols-[1fr_auto] gap-3">
				<Select
					colorScheme="secondary"
					value={currentPage}
					onChange={(e) => onChangePage(parseInt(e.target.value, 10))}
				>
					{range(totalPages, 1).map((page) => (
						<option key={page} value={page} className="text-ct-neutral-light-800 outline-ct-special1-500">
							Page {page}
						</option>
					))}
				</Select>

				<Select colorScheme="secondary" value={itemsPerPag} onChange={changeItemsPerPage}>
					{[5, 10].map((v) => (
						<option key={v} value={v} className="text-ct-neutral-light-800 outline-ct-special1-500">
							Per page {v}
						</option>
					))}
				</Select>
			</div>

			<IconButton
				className=" bg-ct-special1-600 text-ct-neutral-light-800"
				disabled={currentPage >= totalPages}
				onClick={() => onChangePage(currentPage + 1)}
				icon={MdNavigateNext}
			/>
		</div>
	);
};
