import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleState } from '../article/Article';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleState;
	onApply: (newState: ArticleState) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isFormOpen]);

	const handleToggle = () => setIsFormOpen(!isFormOpen);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const updateField =
		(field: keyof ArticleState) =>
		(value: ArticleState[keyof ArticleState]) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggle} />
			<aside
				className={
					isFormOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='шрифт'
						onChange={updateField('fontFamilyOption')}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='fontSize'
						onChange={updateField('fontSizeOption')}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='цвет шрифта'
						onChange={updateField('fontColor')}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='цвет фона'
						onChange={updateField('backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='ширина контента'
						onChange={updateField('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
