# Generated by Django 5.0.4 on 2024-04-09 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_newsitem_comment_news_item'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='news_item',
            new_name='newsItem',
        ),
    ]
