
@Post()
create(@Body() createMascotaDto: CreateMascotaDto) {
  return this.mascotasService.create(createMascotaDto);
}

@Patch(':id')
update(
  @Param('id') id: string,
  @Body() updateMascotaDto: UpdateMascotaDto,
) {
  return this.mascotasService.update(+id, updateMascotaDto);
}
