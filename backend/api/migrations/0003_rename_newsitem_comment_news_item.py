# Generated by Django 5.0.4 on 2024-04-09 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_newsitem_rating_alter_newsitem_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='newsItem',
            new_name='news_item',
        ),
    ]
