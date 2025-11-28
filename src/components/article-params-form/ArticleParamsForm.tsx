// ArticleParamsForm.tsx
import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { clsx } from 'clsx';
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
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleToggle = () => setIsOpen(!isOpen);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		const defaultState = {
			fontFamilyOption: fontFamilyOptions[0],
			fontSizeOption: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		};
		setFormState(defaultState);
		onApply(defaultState);
	};

	const updateField = (field: keyof ArticleState) => (value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
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
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
