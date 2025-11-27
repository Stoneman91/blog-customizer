import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [newFontFamilyOptions, setNewFontFamilyOption] = useState(
		fontFamilyOptions[0]
	);
	const [newFontSize, setNewFontSize] = useState(fontSizeOptions[0]);
	const [newFontColor, setNewFontColor] = useState(fontColors[0]);
	const [newBackgroundColor, setNewBackgroundColor] = useState(
		backgroundColors[0]
	);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleReset = () => {
		setNewFontFamilyOption(fontFamilyOptions[0]);
		setNewFontSize(fontSizeOptions[0]);
		setNewFontColor(fontColors[0]);
		setNewBackgroundColor(backgroundColors[0]);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			{isOpen && (
				<aside className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={newFontFamilyOptions}
							title='шрифт'
							onChange={setNewFontFamilyOption}
						/>
						<RadioGroup
							selected={newFontSize}
							name='radio'
							onChange={setNewFontSize}
							options={fontSizeOptions}
							title='размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={newFontColor}
							title='цвет шрифта'
							onChange={setNewFontColor}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={newBackgroundColor}
							title='цвет фона'
							onChange={setNewBackgroundColor}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
